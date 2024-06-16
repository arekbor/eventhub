import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Login } from "@core/models/login.model";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { FormControls } from "@shared/utils/form-controls";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
})
export class LoginComponent extends BaseComponent implements OnInit {
  protected form: FormGroup<FormGroupControl<Login>>;

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected onSubmit(): void {
    throw new Error("Method not implemented.");
  }

  protected onCreateAccount(): void {
    this.router.navigate(["user/register"]);
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<Login>>({
      email: FormControls.email(),
      password: FormControls.password(),
    });
  }
}
