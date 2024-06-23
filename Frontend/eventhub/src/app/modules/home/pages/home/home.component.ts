import { Component, OnInit } from "@angular/core";
import { CalendarView } from "angular-calendar";
import { WeekDay } from "calendar-utils";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
})
export class HomeComponent implements OnInit {
  protected viewDate: Date = new Date();
  protected CalendarView = CalendarView;
  protected CalendarViewType = CalendarView;
  protected view: CalendarView;

  protected setHeaderColStyle(weekDay: WeekDay): {
    [klass: string]: unknown;
  } {
    return {
      "text-teal-600": weekDay.isToday,
      "text-red-600": weekDay.isPast,
      "text-gray-600": weekDay.isFuture,
    };
  }

  ngOnInit(): void {
    this.setView(CalendarView.Week);
  }

  protected setView(view: CalendarView): void {
    this.view = view;
  }
}
