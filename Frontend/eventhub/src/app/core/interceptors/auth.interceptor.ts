import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthTokens } from "@core/models/auth-tokens.model";
import { StorageService } from "@core/services/storage.service";
import { UserService } from "@core/services/user.service";
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshToken$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.storageService.getAccessToken();
    if (accessToken) {
      req = this.addAccessTokenToHeader(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (
          err.status === HttpStatusCode.Unauthorized &&
          this.isUrlAllowed(req.url)
        ) {
          return this.handleUnauthorizedError(req, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handleUnauthorizedError(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshToken$.next(null);

      return this.userService.refreshToken().pipe(
        switchMap((authTokens: AuthTokens) => {
          this.isRefreshing = false;
          this.refreshToken$.next(authTokens.accessToken);
          return next.handle(
            this.addAccessTokenToHeader(req, authTokens.accessToken)
          );
        })
      );
    } else {
      return this.refreshToken$.pipe(
        filter((accessToken: string | null) => accessToken != null),
        take(1),
        switchMap((accessToken: string | null) => {
          return next.handle(this.addAccessTokenToHeader(req, accessToken!));
        })
      );
    }
  }

  private addAccessTokenToHeader(
    request: HttpRequest<unknown>,
    accessToken: string
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
