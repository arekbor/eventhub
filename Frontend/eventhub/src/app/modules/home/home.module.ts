import { NgModule } from "@angular/core";
import { CalendarEventDialogComponent } from "@modules/home/components/calendar-event-dialog/calendar-event-dialog.component";
import { HomeRoutingModule } from "@modules/home/home-routing.module";
import { HomeComponent } from "@modules/home/pages/home/home.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [HomeComponent, CalendarEventDialogComponent],
  imports: [HomeRoutingModule, SharedModule.forRoot()],
})
export class HomeModule {}
