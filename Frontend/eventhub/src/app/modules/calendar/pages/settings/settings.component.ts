import { Component, OnInit } from "@angular/core";
import {
  CalendarAccess,
  CalendarAccessMap,
} from "@core/enums/calendar-access.enum";
import { CalendarPermission } from "@core/models/calendar-permission.model";
import { PermissionDialogComponent } from "@modules/calendar/components/permission-dialog/permission-dialog.component";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-settings",
  templateUrl: "settings.component.html",
})
export class SettingsComponent implements OnInit {
  protected calendarPermissions: CalendarPermission[];

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.initCalendarPermissions();
  }

  protected mapCalendarAccess(access: CalendarAccess): string | undefined {
    return CalendarAccessMap.find((x) => x.access === access)?.name;
  }

  protected onEdit(calendarPermission: CalendarPermission): void {
    this.dialogService.open(
      PermissionDialogComponent,
      this.configDialog(calendarPermission)
    );
  }

  protected onAddUser(): void {
    this.dialogService.open(PermissionDialogComponent, this.configDialog());
  }

  private configDialog(
    calendarPermission?: CalendarPermission
  ): DynamicDialogConfig {
    return {
      data: calendarPermission,
      focusOnShow: false,
      draggable: true,
    };
  }

  private initCalendarPermissions(): void {
    throw new Error("Not Implemented");
  }
}
