import { FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "@shared/utils/custom-validators";

export class FormControls {
  static boolean(): FormControl<boolean> {
    return new FormControl(false, {
      nonNullable: true,
    });
  }

  static title(): FormControl<string> {
    return new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(20)],
    });
  }

  static description(): FormControl<string | null> {
    return new FormControl();
  }

  static date(date?: Date): FormControl<Date> {
    return date ? new FormControl(date) : new FormControl();
  }

  static email(): FormControl<string> {
    return new FormControl("", {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    });
  }

  static password(): FormControl<string> {
    return new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    });
  }

  static registerPassword(): FormControl<string> {
    return new FormControl("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        CustomValidators.containsLowercase(),
        CustomValidators.containNumber(),
        CustomValidators.containsUppercase(),
        CustomValidators.containsSpecialChar(),
      ],
    });
  }

  static username(): FormControl<string> {
    return new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    });
  }
}
