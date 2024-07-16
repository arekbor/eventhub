import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  CalendarAccess,
  CalendarAccessMap,
} from "@core/enums/calendar-access.enum";
import { CalendarPermissionBody } from "@core/models/calendar-permission-body.model";
import { CalendarPermission } from "@core/models/calendar-permission.model";
import { SearchUser } from "@core/models/search-user.model";
import { CalendarPermissionService } from "@core/services/calendar-permission.service";
import { UserService } from "@core/services/user.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { Perform } from "@modules/perform";
import { FormControls } from "@shared/utils/form-controls";
import {
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from "primeng/autocomplete";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { of, switchMap } from "rxjs";

@Component({
  selector: "app-calendar-permission-dialog",
  templateUrl: "calendar-permission-dialog.component.html",
})
export class CalendarPermissionDialogComponent
  extends BaseComponent
  implements OnInit
{
  protected calendarPermission: CalendarPermission | undefined;

  protected form: FormGroup<FormGroupControl<CalendarPermissionBody>>;

  protected calendarPermissionPerform: Perform<void> = new Perform<void>();

  protected searchUsers: SearchUser[];
  protected selectedSearchUser: SearchUser;
  protected accessOptions = CalendarAccessMap;

  constructor(
    private config: DynamicDialogConfig<CalendarPermission>,
    private userService: UserService,
    private calendarPermissionService: CalendarPermissionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.initCalendarPermission();
  }

  protected onSelectEmail(event: AutoCompleteSelectEvent): void {
    this.selectedSearchUser = event.value as SearchUser;
  }

  protected onSubmit(): void {
    if (!this.calendarPermission && !this.selectedSearchUser) {
      return;
    }

    const calendarPermissionBody = this.form.getRawValue();

    this.safeSub(
      this.calendarPermissionPerform
        .load(
          of(this.calendarPermission).pipe(
            switchMap((calendarPermission: CalendarPermission | undefined) => {
              if (calendarPermission) {
                return this.calendarPermissionService.update(
                  calendarPermission.userId,
                  calendarPermissionBody
                );
              }
              return this.calendarPermissionService.add(
                this.selectedSearchUser.id,
                calendarPermissionBody
              );
            })
          ),
          false
        )
        .subscribe((): void => {
          window.location.reload();
        })
    );
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

  private initCalendarPermission(): void {
    this.calendarPermission = this.config.data;

    if (this.calendarPermission) {
      this.updateForm(this.calendarPermission);
    }
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
