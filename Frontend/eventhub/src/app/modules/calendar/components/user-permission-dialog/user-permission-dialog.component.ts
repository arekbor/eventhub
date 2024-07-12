import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  CalendarAccess,
  CalendarAccessMap,
} from "@core/enums/calendar-access.enum";
import { SearchUserResult } from "@core/models/search-user-result.model";
import { UserCalendarPermissionBody } from "@core/models/user-calendar-permission-body.model";
import { UserCalendarPermission } from "@core/models/user-calendar-permission.model";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { Perform } from "@modules/perform";
import { FormControls } from "@shared/utils/form-controls";
import { AutoCompleteCompleteEvent } from "primeng/autocomplete";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-user-permission-dialog",
  templateUrl: "user-permission-dialog.component.html",
})
export class UserPermissionDialogComponent
  extends BaseComponent
  implements OnInit
{
  protected userCalendarPermission: UserCalendarPermission | undefined;
  protected form: FormGroup<FormGroupControl<UserCalendarPermissionBody>>;

  protected userCalendarPermissionPerform: Perform<void> = new Perform<void>();

  protected searchUserResults: SearchUserResult[];
  protected accessOptions = CalendarAccessMap;

  constructor(
    private config: DynamicDialogConfig<UserCalendarPermission>,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.initUserCalendarPermission();
  }

  protected initUserCalendarPermission(): void {
    this.userCalendarPermission = this.config.data;

    if (this.userCalendarPermission) {
      this.updateForm(this.userCalendarPermission);
    }
  }

  protected onSubmit(): void {
    console.log(this.form.getRawValue());
  }

  protected searchByEmail(event: AutoCompleteCompleteEvent): void {
    this.safeSub(
      this.userService
        .searchByEmail(event.query)
        .subscribe((searchUserResults: SearchUserResult[]) => {
          this.searchUserResults = searchUserResults;
        })
    );
  }

  private updateForm(userCalendarPermission: UserCalendarPermission): void {
    this.form.setValue({
      access: userCalendarPermission.access,
    });
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<UserCalendarPermissionBody>>({
      access: FormControls.calendarAccessPermission(CalendarAccess.CanOnlyRead),
    });
  }
}
