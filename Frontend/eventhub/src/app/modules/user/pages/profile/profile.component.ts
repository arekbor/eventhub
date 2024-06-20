import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { User } from "@core/models/user.model";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { Perform } from "@core/utils/perform";
import { BaseComponent } from "@modules/base.component";
import { FormControls } from "@shared/utils/form-controls";

@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html",
})
export class ProfileComponent extends BaseComponent implements OnInit {
  protected form: FormGroup<FormGroupControl<User>>;
  protected user: Perform<User> = new Perform<User>();

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.initUser();
    this.initForm();
  }

  protected onSubmit(): void {
    throw new Error("Not Implemented");
  }

  private initUser(): void {
    this.safeSub(
      this.user.load(this.userService.getUser()).subscribe((user: User) => {
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
