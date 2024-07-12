import { Component, OnInit } from "@angular/core";
import {
  CalendarAccess,
  CalendarAccessMap,
} from "@core/enums/calendar-access.enum";
import { UserCalendarPermission } from "@core/models/user-calendar-permission.model";
import { UserPermissionDialogComponent } from "@modules/calendar/components/user-permission-dialog/user-permission-dialog.component";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-settings",
  templateUrl: "settings.component.html",
})
export class SettingsComponent implements OnInit {
  protected userCalendarPermissions: UserCalendarPermission[];

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.initUserCalendarPermissions();
  }

  protected mapCalendarAccess(access: CalendarAccess): string | undefined {
    return CalendarAccessMap.find((x) => x.access === access)?.name;
  }

  protected onEdit(userCalendarPermission: UserCalendarPermission): void {
    this.dialogService.open(
      UserPermissionDialogComponent,
      this.configDialog(userCalendarPermission)
    );
  }

  protected onAddUser(): void {
    this.dialogService.open(UserPermissionDialogComponent, this.configDialog());
  }

  private configDialog(
    userCalendarPermission?: UserCalendarPermission
  ): DynamicDialogConfig {
    return {
      data: userCalendarPermission,
      focusOnShow: false,
      draggable: true,
    };
  }

  private initUserCalendarPermissions(): void {
    throw new Error("Not Implemented");
  }
}
