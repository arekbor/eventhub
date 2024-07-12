import { NgModule } from "@angular/core";
import { CalendarRoutingModule } from "@modules/calendar/calendar-routing.module";
import { EventDialogComponent } from "@modules/calendar/components/event-dialog/event-dialog.component";
import { PermissionDialogComponent } from "@modules/calendar/components/permission-dialog/permission-dialog.component";
import { CalendarComponent } from "@modules/calendar/pages/calendar/calendar.component";
import { SettingsComponent } from "@modules/calendar/pages/settings/settings.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [
    CalendarComponent,
    EventDialogComponent,
    SettingsComponent,
    PermissionDialogComponent,
  ],
  imports: [CalendarRoutingModule, SharedModule.forRoot()],
})
export class CalendarModule {}
