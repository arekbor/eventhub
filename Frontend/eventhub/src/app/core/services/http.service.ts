import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpService {
  public handleHttpErrors(error: HttpErrorResponse): string[] {
    const handledErrors: string[] = [];

    const errorDetail = error.error.detail || error.statusText;
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
