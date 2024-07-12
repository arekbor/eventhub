import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UpdateProfile } from "@core/models/update-profile.model";
import { UserResult } from "@core/models/user-result.model";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { Perform } from "@modules/perform";
import { FormControls } from "@shared/utils/form-controls";
import { switchMap } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html",
})
export class ProfileComponent extends BaseComponent implements OnInit {
  protected form: FormGroup<FormGroupControl<UpdateProfile>>;
  protected userResultPerform: Perform<UserResult> = new Perform<UserResult>();
  protected updateProfilePerform: Perform<void> = new Perform<void>();

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.initUser();
    this.initForm();
  }

  protected onSubmit(): void {
    this.safeSub(
      this.updateProfilePerform
        .load(this.userService.updateProfile(this.form.getRawValue()), false)
        .pipe(switchMap(() => this.userService.refreshToken()))
        .subscribe((): void => {
          window.location.reload();
        })
    );
  }

  private initUser(): void {
    this.safeSub(
      this.userResultPerform
        .load(this.userService.getUser())
        .subscribe((user: UserResult) => {
          this.updateForm(user);
        })
    );
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<UpdateProfile>>({
      email: FormControls.email(),
      username: FormControls.username(),
    });
  }

  private updateForm(updateProfile: UpdateProfile): void {
    this.form.setValue({
      email: updateProfile.email,
      username: updateProfile.username,
    });
  }
}
