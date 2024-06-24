import { Component, OnInit } from "@angular/core";
import { CalendarView } from "angular-calendar";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
})
export class HomeComponent implements OnInit {
  protected viewDate: Date = new Date();
  protected CalendarView = CalendarView;
  protected CalendarViewType = CalendarView;
  protected view: CalendarView;
  protected calendarSettingsMenuItems: MenuItem[];
  protected calendarViewMenuItems: MenuItem[];

  ngOnInit(): void {
    this.setView(CalendarView.Month);
    this.setCalendarSettingsMenuItems();
    this.setCalendarViewMenuItems();
  }

  private setCalendarSettingsMenuItems(): void {
    this.calendarSettingsMenuItems = [
      {
        label: "Print",
      },
    ];
  }

  private setCalendarViewMenuItems(): void {
    this.calendarViewMenuItems = [
      {
        label: "Day",
        command: () => {
          this.setView(CalendarView.Day);
        },
      },
      {
        label: "Week",
        command: () => {
          this.setView(CalendarView.Week);
        },
      },
      {
        label: "Month",
        command: () => {
          this.setView(CalendarView.Month);
        },
      },
    ];
  }

  private setView(view: CalendarView): void {
    this.view = view;
  }
}
