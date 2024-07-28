import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthTokens } from "@core/models/auth-tokens.model";
import { CalendarSettings } from "@core/models/calendar-settings.model";
import { Login } from "@core/models/login.model";
import { CalendarSettingsService } from "@core/services/calendar-settings.service";
import { StorageService } from "@core/services/storage.service";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { Perform } from "@modules/perform";
import { FormControls } from "@shared/utils/form-controls";
import { map, mergeMap, tap } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
})
export class LoginComponent extends BaseComponent implements OnInit {
  protected form: FormGroup<FormGroupControl<Login>>;
  protected loginPerform = new Perform<AuthTokens>();

  constructor(
    private router: Router,
    private userService: UserService,
    private calendarSettingsService: CalendarSettingsService,
    private storageService: StorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected onSubmit(): void {
    this.safeSub(
      this.loginPerform
        .load(
          this.userService.login(this.form.getRawValue()).pipe(
            tap((authTokens: AuthTokens) => {
              console.log("auth tokens: ", authTokens);
              this.storageService.setAuthTokens(authTokens);
            }),
            mergeMap((authTokens: AuthTokens) =>
              this.calendarSettingsService.getCalendarSettings().pipe(
                tap((calendarSettings: CalendarSettings) => {
                  console.log("calendarSettings: ", calendarSettings);
                  this.storageService.setCalendarSettings(calendarSettings);
                }),
                map(() => authTokens)
              )
            )
          )
        )
        .subscribe(() => {
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
