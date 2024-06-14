import { FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "@shared/utils/custom-validators";

export class FormControls {
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
