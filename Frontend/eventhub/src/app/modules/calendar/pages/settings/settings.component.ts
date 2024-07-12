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
    console.log(userCalendarPermission, "confi dialog");

    return {
      data: userCalendarPermission,
      focusOnShow: false,
      draggable: true,
    };
  }

  private initUserCalendarPermissions(): void {
    this.userCalendarPermissions = [
      {
        id: "1",
        userId: "1",
        email: "a_r_e_k97@onet.pl",
        username: "a_r_e_k97",
        access: CalendarAccess.CanOnlyRead,
      },
      {
        id: "2",
        userId: "2",
        email: "marek@onet.pl",
        username: "marek",
        access: CalendarAccess.CanOnlyRead,
      },
      {
        id: "3",
        userId: "3",
        email: "j_doe@example.com",
        username: "john_doe",
        access: CalendarAccess.CanReadAndModify,
      },
      {
        id: "4",
        userId: "9",
        email: "kasia_zajac@example.com",
        username: "kasia_z",
        access: CalendarAccess.CanOnlyRead,
      },
      {
        id: "5",
        userId: "8",
        email: "t_kowalski@example.com",
        username: "tomek_k",
        access: CalendarAccess.CanReadAndModify,
      },
      {
        id: "6",
        userId: "4",
        email: "m_smith@example.com",
        username: "mary_smith",
        access: CalendarAccess.CanOnlyRead,
      },
      {
        id: "7",
        userId: "6",
        email: "piotr_nowak@example.com",
        username: "piotr_n",
        access: CalendarAccess.CanOnlyRead,
      },
      {
        id: "8",
        userId: "10",
        email: "robert_lewandowski@example.com",
        username: "robert_l",
        access: CalendarAccess.CanReadAndModify,
      },
      {
        id: "9",
        userId: "12",
        email: "frajer_lewandowski@example.com",
        username: "robert_l",
        access: CalendarAccess.CanReadAndModify,
      },
    ];
  }
}
