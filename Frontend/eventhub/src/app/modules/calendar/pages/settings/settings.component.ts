import { Component, OnInit } from "@angular/core";
import {
  CalendarAccess,
  CalendarAccessMap,
} from "@core/enums/calendar-access.enum";
import { CalendarPermission } from "@core/models/calendar-permission.model";
import { PaginatedList } from "@core/models/paginated-list.model";
import { CalendarPermissionService } from "@core/services/calendar-permission.service";
import { UserService } from "@core/services/user.service";
import { BaseComponent } from "@modules/base.component";
import { CalendarPermissionDialogComponent } from "@modules/calendar/components/calendar-permission-dialog/calendar-permission-dialog.component";
import { Perform } from "@modules/perform";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { PaginatorState } from "primeng/paginator";

@Component({
  selector: "app-settings",
  templateUrl: "settings.component.html",
})
export class SettingsComponent extends BaseComponent implements OnInit {
  protected calendarPermissionsPerform = new Perform<
    PaginatedList<CalendarPermission>
  >();

  protected first = 1;
  protected rows = 5;

  protected userManagerId: string | undefined;

  constructor(
    private dialogService: DialogService,
    private calendarPermissionService: CalendarPermissionService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initUserManagerId();
    this.getCalendarPermissions(this.first, this.rows);
  }

  protected mapCalendarAccess(access: CalendarAccess): string | undefined {
    return CalendarAccessMap.find((x) => x.access === access)?.name;
  }

  protected onUpdate(calendarPermission: CalendarPermission): void {
    this.dialogService.open(
      CalendarPermissionDialogComponent,
      this.configDialog(calendarPermission)
    );
  }

  protected onAdd(): void {
    this.dialogService.open(
      CalendarPermissionDialogComponent,
      this.configDialog()
    );
  }

  protected onPageChange(event: PaginatorState): void {
    this.getCalendarPermissions(
      event.page ? event.page + 1 : 1,
      event.rows ?? 5
    );
  }

  protected canModify(userId: string): boolean {
    return this.userManagerId !== userId;
  }

  private getCalendarPermissions(pageNumber: number, pageSize: number): void {
    this.safeSub(
      this.calendarPermissionsPerform
        .load(
          this.calendarPermissionService.getUserCalendarPermissions(
            pageNumber,
            pageSize
          )
        )
        .subscribe()
    );
  }

  private initUserManagerId(): void {
    this.userManagerId = this.userService.getClaims()?.nameid;
  }

  private configDialog(
    calendarPermission?: CalendarPermission
  ): DynamicDialogConfig<CalendarPermission> {
    return {
      data: calendarPermission,
      focusOnShow: false,
      draggable: true,
    };
  }
}
