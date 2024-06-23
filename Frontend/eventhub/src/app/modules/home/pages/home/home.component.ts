import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CalendarView, DateFormatterParams } from "angular-calendar";
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

  public dupaFormatter({ date, locale }: DateFormatterParams): string {
    return formatDate(date, "EEE", locale!);
  }

  protected setView(view: CalendarView): void {
    this.view = view;
  }
}
