import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthTokens } from "@core/models/auth-tokens.model";
import { Login } from "@core/models/login.model";
import { StorageService } from "@core/services/storage.service";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { FormControls } from "@shared/utils/form-controls";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
})
export class LoginComponent extends BaseComponent implements OnInit {
  protected form: FormGroup<FormGroupControl<Login>>;

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected onSubmit(): void {
    this.safeSub(
      this.userService
        .login(this.form.getRawValue())
        .subscribe((authTokens: AuthTokens) => {
          this.storageService.setAuthTokens(authTokens);
          window.location.reload();
        })
    );
  }

  protected onCreateAccount(): void {
    this.router.navigate(["auth/register"]);
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<Login>>({
      email: FormControls.email(),
      password: FormControls.password(),
    });
  }
}
