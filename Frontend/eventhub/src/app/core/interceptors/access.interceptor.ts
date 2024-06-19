import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "@core/services/storage.service";
import { UserService } from "@core/services/user.service";
import { Observable } from "rxjs";

@Injectable()
export class AccessInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isUrlAllowed(req.url)) {
      return next.handle(req);
    }

    return next.handle(this.setAuthorizationHeader(req));
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
