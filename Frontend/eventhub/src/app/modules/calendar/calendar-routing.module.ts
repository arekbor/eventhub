import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "@modules/calendar/pages/calendar/calendar.component";
import { SettingsComponent } from "@modules/calendar/pages/settings/settings.component";

const routes: Routes = [
  {
    path: "",
    component: CalendarComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
