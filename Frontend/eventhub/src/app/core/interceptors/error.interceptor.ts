import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleHttpErrors(err).forEach((error: string) => {
          this.messageService.add({
            severity: "error",
            summary: "Server error",
            detail: error,
          });
        });

        return throwError(() => err);
      })
    );
  }

  private handleHttpErrors(error: HttpErrorResponse): string[] {
    const handledErrors: string[] = [];

    const errorDetail = error.error.detail;
    if (errorDetail) {
      handledErrors.push(errorDetail);
    }

    const otherErrors = error.error.errors;
    if (otherErrors) {
      Object.keys(otherErrors).forEach((errorKey: string) => {
        handledErrors.push(otherErrors[errorKey]);
      });
    }

    return handledErrors;
  }
}
