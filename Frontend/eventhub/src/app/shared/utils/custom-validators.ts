import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  static containsUppercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const uppercaseLetterPattern = /[A-Z]+/;
      if (!uppercaseLetterPattern.test(control.value)) {
        return { notContainUppercase: true };
      }

      return null;
    };
  }

  static containsLowercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const lowercaseLetterPattern = /[a-z]+/;
      if (!lowercaseLetterPattern.test(control.value)) {
        return { notContainLowercase: true };
      }

      return null;
    };
  }

  static containNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const numberPattern = /[0-9]+/;
      if (!numberPattern.test(control.value)) {
        return { notContainNumber: true };
      }

      return null;
    };
  }

  static containsSpecialChar(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const specialCharacterPattern = /[""!@#$%^&*(){}:;<>,.?/+_=|'~\\-]/;
      if (!specialCharacterPattern.test(control.value)) {
        return { notContainSpecialChar: true };
      }

      return null;
    };
  }

  static passwordMatch(
    passwordControlPath: string,
    confirmPasswordControlPath: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(passwordControlPath);
      const confirmPasswordControl = control.get(confirmPasswordControlPath);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors["passwordMismatch"]
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }

      confirmPasswordControl.setErrors(null);
      return null;
    };
  }
}
