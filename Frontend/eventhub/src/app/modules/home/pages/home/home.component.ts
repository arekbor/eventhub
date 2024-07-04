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

  protected calendarEvents: CalendarEvent<string>[];

  protected currentView: CalendarView;
  protected CalendarView = CalendarView;

  protected calendarViewMenuItems: MenuItem[];

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.initCalendarEvents();
    this.setView(CalendarView.Month);
    this.setCalendarViewMenuItems();
  }

  protected onCreateEvent(): void {
    this.dialogService.open(CalendarEventDialogComponent, this.configDialog());
  }

  protected onEventClicked(event: { event: CalendarEvent<string> }): void {
    this.dialogService.open(
      CalendarEventDialogComponent,
      this.configDialog(event.event)
    );
  }

  private initCalendarEvents(): void {
    this.calendarEvents = [
      {
        title: "test",
        allDay: true,
        meta: "<p>some test meta</p>",
        start: new Date(2024, 5, 27, 10, 30),
        end: new Date(2024, 5, 29, 11, 0),
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
    this.currentView = view;
  }

  private configDialog(
    data?: CalendarEvent<string>
  ): DynamicDialogConfig<CalendarEvent<string>> {
    return {
      data: data,
      focusOnShow: false,
      draggable: true,
    };
  }
}
