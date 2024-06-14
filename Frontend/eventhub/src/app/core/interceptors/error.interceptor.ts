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
      catchError((error: HttpErrorResponse) => {
        const errorsToDisplay = this.handleHttpErrors(error);

        errorsToDisplay.forEach((errorToDisplay: string) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: errorToDisplay,
          });
        });
        return throwError(() => error);
      })
    );
  }

  private handleHttpErrors(error: HttpErrorResponse): string[] {
    const errorsToDisplay: string[] = [];

    const errorDetail = error.error.detail || error.statusText;
    if (errorDetail) {
      errorsToDisplay.push(errorDetail);
    }

    const otherErrors = error.error.errors;
    if (otherErrors) {
      Object.keys(otherErrors).forEach((errorKey: string) => {
        errorsToDisplay.push(otherErrors[errorKey]);
      });
    }

    return errorsToDisplay;
  }
}
