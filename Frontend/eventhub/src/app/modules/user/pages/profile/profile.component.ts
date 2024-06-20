import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { User } from "@core/models/user.model";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { Perform } from "@modules/perform";
import { FormControls } from "@shared/utils/form-controls";

@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html",
})
export class ProfileComponent extends BaseComponent implements OnInit {
  protected form: FormGroup<FormGroupControl<User>>;
  protected userPerform: Perform<User> = new Perform<User>();
  protected updatePerform: Perform<void> = new Perform<void>();

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.initUser();
    this.initForm();
  }

  protected onSubmit(): void {
    this.safeSub(
      this.updatePerform
        .load(this.userService.updateProfile(this.form.getRawValue()), false)
        .subscribe((): void => {
          window.location.reload();
          throw Error("Refresh token not implemented.");
        })
    );
  }

  private initUser(): void {
    this.safeSub(
      this.userPerform
        .load(this.userService.getUser())
        .subscribe((user: User) => {
          this.updateForm(user);
        })
    );
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<User>>({
      email: FormControls.email(),
      username: FormControls.username(),
    });
  }

  private updateForm(user: User): void {
    this.form.setValue({
      email: user.email,
      username: user.username,
    });
  }
}
