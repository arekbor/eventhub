import { NgModule } from "@angular/core";
import { CalendarRoutingModule } from "@modules/calendar/calendar-routing.module";
import { EventDialogComponent } from "@modules/calendar/components/event-dialog/event-dialog.component";
import { UserPermissionDialogComponent } from "@modules/calendar/components/user-permission-dialog/user-permission-dialog.component";
import { CalendarComponent } from "@modules/calendar/pages/calendar/calendar.component";
import { SettingsComponent } from "@modules/calendar/pages/settings/settings.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [
    CalendarComponent,
    EventDialogComponent,
    SettingsComponent,
    UserPermissionDialogComponent,
  ],
  imports: [CalendarRoutingModule, SharedModule.forRoot()],
})
export class CalendarModule {}
