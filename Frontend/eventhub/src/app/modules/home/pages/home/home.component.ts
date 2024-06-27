import { Component, OnInit } from "@angular/core";
import { CalendarEventDialogComponent } from "@modules/home/components/calendar-event-dialog/calendar-event-dialog.component";
import { CalendarEvent, CalendarView } from "angular-calendar";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
})
export class HomeComponent implements OnInit {
  protected viewDate: Date = new Date();

  protected calendarEvents: CalendarEvent[];

  protected currentView: CalendarView;
  protected CalendarView = CalendarView;

  protected calendarViewMenuItems: MenuItem[];

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.setView(CalendarView.Month);
    this.setCalendarViewMenuItems();

    this.calendarEvents = [
      {
        title: "test",
        start: new Date(2024, 5, 27, 10, 30),
        end: new Date(2024, 5, 28, 2, 30),
      },
    ];
  }

  protected onCreateEvent(): void {
    this.dialogService.open(CalendarEventDialogComponent, this.configDialog());
  }

  protected onEventClicked(event: {
    event: CalendarEvent<unknown>;
    sourceEvent: MouseEvent | KeyboardEvent;
  }): void {
    this.dialogService.open(
      CalendarEventDialogComponent,
      this.configDialog(event.event)
    );
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
    this.currentView = view;
  }

  private configDialog(data?: CalendarEvent<unknown>): DynamicDialogConfig {
    return {
      data: data,
      focusOnShow: false,
      draggable: true,
    };
  }
}
