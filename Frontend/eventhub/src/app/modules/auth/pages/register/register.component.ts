import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Register } from "@core/models/register.model";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { nameof } from "@core/utils/nameof";
import { Perform } from "@core/utils/perform";
import { BaseComponent } from "@modules/base.component";
import { CustomValidators } from "@shared/utils/custom-validators";
import { FormControls } from "@shared/utils/form-controls";

@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
})
export class RegisterComponent extends BaseComponent implements OnInit {
  protected form: FormGroup<FormGroupControl<Register>>;
  protected data: Perform<void> = new Perform<void>();

  constructor(private router: Router, private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected onLogin(): void {
    this.router.navigate(["/auth/login"]);
  }

  protected onSubmit(): void {
    this.safeSub(
      this.data
        .load(this.userService.register(this.form.getRawValue()), false)
        .subscribe((): void => {
          this.router.navigate(["/auth/login"]);
        })
    );
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
  }
}
