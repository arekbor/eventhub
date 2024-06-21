import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from "@core/services/storage.service";
import { UserService } from "@core/services/user.service";
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  finalize,
  map,
  switchMap,
  take,
  throwError,
} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenRefreshed$ = new BehaviorSubject<boolean>(false);

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private jwtHelperService: JwtHelperService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isUrlForRefreshTokenIsAllowed(req.url)) {
      return next.handle(req);
    }

    return this.refreshToken(
      next.handle(this.setAuthorizationHeader(req)),
      req,
      next
    );
  }

  private refreshToken(
    action$: Observable<HttpEvent<unknown>>,
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return action$.pipe(
      filter((x) => x.type === HttpEventType.Response),
      map((action: HttpEvent<unknown>) => {
        return action;
      }),
      catchError((err: HttpErrorResponse) => {
        const accessToken = this.storageService.getAccessToken();
        if (!accessToken) {
          this.userService.logout();
        }

        if (this.jwtHelperService.isTokenExpired(accessToken)) {
          if (this.isRefreshingToken) {
            return this.tokenRefreshed$.pipe(
              filter(Boolean),
              take(1),
              switchMap(() => next.handle(this.setAuthorizationHeader(req)))
            );
          }
          this.isRefreshingToken = true;
          this.tokenRefreshed$.next(false);

          return this.userService.reloadTokens().pipe(
            switchMap(() => {
              this.tokenRefreshed$.next(true);
              return next.handle(this.setAuthorizationHeader(req));
            }),
            catchError((err: HttpErrorResponse) => {
              this.userService.logout();
              return throwError(() => err);
            }),
            finalize(() => {
              this.isRefreshingToken = false;
            })
          );
        }
        return throwError(() => err);
      })
    );
  }

  private isUrlForRefreshTokenIsAllowed(url: string): boolean {
    const skipUrls: string[] = [
      `/Users/register`,
      `/Users/login`,
      `/Users/refresh`,
    ];

    return !skipUrls.some((urls) => url.includes(urls));
  }

  private setAuthorizationHeader(
    req: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    const accessToken = this.storageService.getAccessToken();

    return accessToken
      ? req.clone({
          headers: req.headers.set("Authorization", `Bearer ${accessToken}`),
        })
      : req;
  }
}
