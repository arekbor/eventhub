import { Component, OnInit } from "@angular/core";
import {
  CalendarAccess,
  CalendarAccessMap,
} from "@core/enums/calendar-access.enum";
import { CalendarPermission } from "@core/models/calendar-permission.model";
import { CalendarSettingsBody } from "@core/models/calendar-settings-body.model";
import { CalendarSettings } from "@core/models/calendar-settings.model";
import { PaginatedList } from "@core/models/paginated-list.model";
import { CalendarPermissionService } from "@core/services/calendar-permission.service";
import { CalendarSettingsService } from "@core/services/calendar-settings.service";
import { UserService } from "@core/services/user.service";
import { BaseComponent } from "@modules/base.component";
import { CalendarPermissionDialogComponent } from "@modules/calendar/components/calendar-permission-dialog/calendar-permission-dialog.component";
import { Perform } from "@modules/perform";
import { EventColor } from "calendar-utils";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { PaginatorState } from "primeng/paginator";
import { switchMap } from "rxjs";

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

  protected eventColor: EventColor;
  protected blockUpdatingEventColor = true;

  protected updateCalendarSettingsPerform = new Perform<void>();

  constructor(
    private dialogService: DialogService,
    private calendarPermissionService: CalendarPermissionService,
    private userService: UserService,
    private calendarSettingsService: CalendarSettingsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initUserManagerId();
    this.initEventColor();
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

  protected onUpdateEventColors(): void {
    this.safeSub(
      this.updateCalendarSettingsPerform
        .load(
          this.calendarSettingsService.getCalendarSettings().pipe(
            switchMap((calendarSettings: CalendarSettings) => {
              const body = {
                calendarView: calendarSettings.calendarView,
                color: this.eventColor,
              } as CalendarSettingsBody;

              return this.calendarSettingsService.updateCalendarSettings(body);
            })
          )
        )
        .subscribe((): void => {
          this.blockUpdatingEventColor = true;
        })
    );
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

  private initEventColor(): void {
    this.safeSub(
      this.calendarSettingsService
        .getCalendarSettings()
        .subscribe((calendarSettings: CalendarSettings) => {
          this.eventColor = calendarSettings.color;
        })
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
