import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Register } from "@core/models/register.model";
import { FormService } from "@core/services/form.service";
import { UserService } from "@core/services/user.service";
import { FormFieldErrorMap } from "@core/utils/form-field-error-map.type";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { nameof } from "@core/utils/nameof";
import { BaseComponent } from "@modules/base.component";
import { CustomValidators } from "@shared/utils/custom-validators";
import { FormControls } from "@shared/utils/form-controls";

@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
})
export class RegisterComponent extends BaseComponent implements OnInit {
  protected form: FormGroup<FormGroupControl<Register>>;
  protected formFieldErrorMap: FormFieldErrorMap = {};

  constructor(
    private formService: FormService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected onSubmit(): void {
    if (!this.formService.isFormValid(this.form)) {
      return;
    }

    this.userService.register(this.form.getRawValue()).subscribe();
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<Register>>(
      {
        email: FormControls.email(),
        username: FormControls.username(),
        password: FormControls.registerPassword(),
        confirmPassword: FormControls.password(),
      },
      CustomValidators.passwordMatch(
        nameof<Register>("password"),
        nameof<Register>("confirmPassword")
      )
    );

    this.formService.handlerErrors(this.form).subscribe({
      next: (formFieldErrorMap: FormFieldErrorMap) => {
        this.formFieldErrorMap = formFieldErrorMap;
      },
    });
  }
}
