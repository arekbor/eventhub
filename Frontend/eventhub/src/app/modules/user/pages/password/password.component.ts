import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Password } from "@core/models/password.model";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { nameof } from "@core/utils/nameof";
import { BaseComponent } from "@modules/base.component";
import { Perform } from "@modules/perform";
import { CustomValidators } from "@shared/utils/custom-validators";
import { FormControls } from "@shared/utils/form-controls";

@Component({
  selector: "app-password",
  templateUrl: "password.component.html",
})
export class PasswordComponent extends BaseComponent implements OnInit {
  protected form: FormGroup<FormGroupControl<Password>>;
  protected updatePasswordPerform: Perform<void> = new Perform<void>();

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected onSubmit(): void {
    this.safeSub(
      this.updatePasswordPerform
        .load(this.userService.updatePassword(this.form.getRawValue()), false)
        .subscribe(() => {
          this.userService.logout();
        })
    );
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<Password>>(
      {
        currentPassword: FormControls.password(),
        newPassword: FormControls.registerPassword(),
        confirmNewPassword: FormControls.password(),
      },
      CustomValidators.passwordMatch(
        nameof<Password>("newPassword"),
        nameof<Password>("confirmNewPassword")
      )
    );
  }
}
