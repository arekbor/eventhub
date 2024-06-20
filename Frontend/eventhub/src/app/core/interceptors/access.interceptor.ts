import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpService } from "@core/services/http.service";
import { StorageService } from "@core/services/storage.service";
import { UserService } from "@core/services/user.service";
import { MessageService } from "primeng/api";
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from "rxjs";

@Injectable()
export class AccessInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenRefreshed$ = new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private messageService: MessageService,
    private httpService: HttpService,
    private jwtHelperService: JwtHelperService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isUrlAllowed(req.url)) {
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          this.sendErrorMessages(err);
          return throwError(() => err);
        })
      );
    }

    return next.handle(this.setAuthorizationHeader(req)).pipe(
      catchError((err: HttpErrorResponse) => {
        const accessToken = this.storageService.getAccessToken();

        if (this.jwtHelperService.isTokenExpired(accessToken)) {
          return this.refreshToken(req, next);
        }

        this.sendErrorMessages(err);
        return throwError(() => err);
      })
    );
  }

  private refreshToken(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
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
      catchError((err) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.userService.logout();
        } else {
          this.sendErrorMessages(err);
        }
        return throwError(() => err);
      }),
      finalize(() => {
        this.isRefreshingToken = false;
      })
    );
  }

  private sendErrorMessages(err: HttpErrorResponse): void {
    this.httpService.handleHttpErrors(err).forEach((error: string) => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: error,
      });
    });
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

  private isUrlAllowed(url: string): boolean {
    const skipUrls: string[] = [
      `/Users/register`,
      `/Users/login`,
      `/Users/refresh`,
    ];

    return !skipUrls.some((urls) => url.includes(urls));
  }
}
