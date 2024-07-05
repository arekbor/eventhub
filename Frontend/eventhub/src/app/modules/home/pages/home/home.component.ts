import { Component, OnInit } from "@angular/core";
import { CalendarEventService } from "@core/services/calendar-event.service";
import { BaseComponent } from "@modules/base.component";
import { CalendarEventDialogComponent } from "@modules/home/components/calendar-event-dialog/calendar-event-dialog.component";
import {
  CalendarEvent,
  CalendarView,
  CalendarViewPeriod,
} from "angular-calendar";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
})
export class HomeComponent extends BaseComponent implements OnInit {
  protected viewDate: Date = new Date();

  protected calendarEvents: CalendarEvent<string>[] = [];

  protected currentView: CalendarView;
  protected CalendarView = CalendarView;

  protected calendarViewMenuItems: MenuItem[];

  protected calendarViewPeriod: CalendarViewPeriod;
  private previousCalendarViewPeriod: CalendarViewPeriod;

  constructor(
    private dialogService: DialogService,
    private calendarEventService: CalendarEventService
  ) {
    super();
  }

  ngOnInit(): void {
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


  protected onCalendarViewPeriodRender(
    calendarViewPeriod: CalendarViewPeriod
  ): void {
    if (
      !this.previousCalendarViewPeriod ||
      this.previousCalendarViewPeriod.start.getTime() !==
        calendarViewPeriod.start.getTime() ||
      this.previousCalendarViewPeriod.end.getTime() !==
        calendarViewPeriod.end.getTime()
    ) {
      this.previousCalendarViewPeriod = calendarViewPeriod;
      this.initCalendarEvents(calendarViewPeriod.start, calendarViewPeriod.end);
    }
    this.calendarViewPeriod = calendarViewPeriod;
  }

  private initCalendarEvents(start: Date, end: Date): void {
    this.safeSub(
      this.calendarEventService
        .getCalendarEvents(start, end)
        .subscribe((calendarEvents: CalendarEvent<string>[]) => {
          this.calendarEvents = calendarEvents.map(
            (calendarEvent: CalendarEvent<string>) => {
              calendarEvent.start = new Date(calendarEvent.start);
              calendarEvent.end = calendarEvent.end
                ? new Date(calendarEvent.end)
                : undefined;
              return calendarEvent;
            }
          );
        })
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
