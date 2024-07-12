import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  CalendarAccess,
  CalendarAccessMap,
} from "@core/enums/calendar-access.enum";
import { CalendarPermissionBody } from "@core/models/calendar-permission-body.model";
import { CalendarPermission } from "@core/models/calendar-permission.model";
import { SearchUser } from "@core/models/search-user.model";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { Perform } from "@modules/perform";
import { FormControls } from "@shared/utils/form-controls";
import { AutoCompleteCompleteEvent } from "primeng/autocomplete";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-permission-dialog",
  templateUrl: "permission-dialog.component.html",
})
export class PermissionDialogComponent extends BaseComponent implements OnInit {
  protected calendarPermission: CalendarPermission | undefined;
  protected form: FormGroup<FormGroupControl<CalendarPermissionBody>>;

  protected calendarPermissionPerform: Perform<void> = new Perform<void>();

  protected searchUsers: SearchUser[];
  protected accessOptions = CalendarAccessMap;

  constructor(
    private config: DynamicDialogConfig<CalendarPermission>,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.initCalendarPermission();
  }

  protected initCalendarPermission(): void {
    this.calendarPermission = this.config.data;

    if (this.calendarPermission) {
      this.updateForm(this.calendarPermission);
    }
  }

  protected onSubmit(): void {
    throw new Error("Not implemented");
  }

  protected searchByEmail(event: AutoCompleteCompleteEvent): void {
    this.safeSub(
      this.userService
        .searchByEmail(event.query)
        .subscribe((searchUsers: SearchUser[]) => {
          this.searchUsers = searchUsers;
        })
    );
  }

  private updateForm(calendarPermission: CalendarPermission): void {
    this.form.setValue({
      access: calendarPermission.access,
    });
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<CalendarPermissionBody>>({
      access: FormControls.calendarAccessPermission(CalendarAccess.CanOnlyRead),
    });
  }
}
