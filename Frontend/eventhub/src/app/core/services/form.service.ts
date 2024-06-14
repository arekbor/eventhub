import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormFieldErrorMap } from "@core/utils/form-field-error-map.type";
import { FormValidationMessageMap } from "@core/utils/form-validation-message.type";
import { Observable, of, switchMap } from "rxjs";

@Injectable()
export class FormService {
  public isFormValid(form: FormGroup): boolean {
    form.markAllAsTouched();
    form.updateValueAndValidity();
    return form.valid;
  }

  public handlerErrors(form: FormGroup): Observable<FormFieldErrorMap> {
    const formFieldErrorMap: FormFieldErrorMap = {};

    return form.valueChanges.pipe(
      switchMap(() => {
        Object.keys(form.controls).forEach((key: string) => {
          formFieldErrorMap[key] = null;
          const control = form.get(key);

          if (
            control &&
            control.errors &&
            control.invalid &&
            (control.dirty || control.touched)
          ) {
            const controlErrors: string[] = [];

            for (const controlErrorKey in control.errors) {
              controlErrors.push(
                this.formValidationMessageMap[controlErrorKey](
                  control.errors![controlErrorKey]
                )
              );
            }
            formFieldErrorMap[key] = controlErrors;
          } else {
            formFieldErrorMap[key] = null;
          }
        });

        return of(formFieldErrorMap);
      })
    );
  }

  private formValidationMessageMap: FormValidationMessageMap = {
    required: () => `This field is required.`,
    email: () => `Invalid email format.`,
    minlength: (params: { requiredLength: number }) =>
      `Minimum ${params.requiredLength} characters are required.`,
    maxlength: (params: { requiredLength: number }) =>
      `Maximum ${params.requiredLength} characters are allowed.`,
    notContainUppercase: () =>
      `This field must contain at least one uppercase letter.`,
    notContainLowercase: () =>
      `This field must contain at least one lowercase letter.`,
    notContainNumber: () => `This field must contain at least one number.`,
    notContainSpecialChar: () =>
      `This field must contain at least one special character.`,
    passwordMismatch: () => `Passwords do not match.`,
  };
}
