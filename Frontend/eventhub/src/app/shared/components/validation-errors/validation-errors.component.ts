import { Component, Input } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { ErrorParams } from "@core/models/error-params.model";

@Component({
  selector: "app-validation-errors",
  templateUrl: "validation-errors.component.html",
})
export class ValidationErrorsComponent {
  @Input({ required: true }) errors: Record<string, ValidationErrors> | null =
    {};

  protected errorMessages: Record<string, (params: ErrorParams) => string> = {
    required: () => "This field is required",
    email: () => `Invalid email format.`,
    minlength: (params) =>
      `Minimum ${params.requiredLength} characters are required.`,
    maxlength: (params) =>
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
