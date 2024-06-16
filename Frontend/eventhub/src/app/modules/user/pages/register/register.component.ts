import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Register } from "@core/models/register.model";
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

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected onSubmit(): void {
    throw new Error("Method not implemented.");
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
