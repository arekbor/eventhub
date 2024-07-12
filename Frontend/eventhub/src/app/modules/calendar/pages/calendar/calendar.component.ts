import { Component, OnInit } from "@angular/core";
import { Event } from "@core/models/event.model";
import { EventService } from "@core/services/event.service";
import { BaseComponent } from "@modules/base.component";
import { EventDialogComponent } from "@modules/calendar/components/event-dialog/event-dialog.component";
import {
  CalendarEvent,
  CalendarView,
  CalendarViewPeriod,
} from "angular-calendar";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-calendar",
  templateUrl: "calendar.component.html",
})
export class CalendarComponent extends BaseComponent implements OnInit {
  protected viewDate: Date = new Date();

  protected events: Event[] = [];

  protected currentView: CalendarView;
  protected CalendarView = CalendarView;

  protected viewMenuItems: MenuItem[];

  protected viewPeriod: CalendarViewPeriod;
  private previousViewPeriod: CalendarViewPeriod;

  constructor(
    private dialogService: DialogService,
    private eventService: EventService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setView(CalendarView.Month);
    this.setViewMenuItems();
  }

  protected onCreateEvent(): void {
    this.dialogService.open(EventDialogComponent, this.configDialog());
  }

  protected onEventClicked(calendarEvent: CalendarEvent<unknown>): void {
    this.dialogService.open(
      EventDialogComponent,
      this.configDialog(calendarEvent as Event)
    );
  }

  protected onViewPeriodRender(viewPeriod: CalendarViewPeriod): void {
    if (
      !this.previousViewPeriod ||
      this.previousViewPeriod.start.getTime() !== viewPeriod.start.getTime() ||
      this.previousViewPeriod.end.getTime() !== viewPeriod.end.getTime()
    ) {
      this.previousViewPeriod = viewPeriod;
      this.initEvents(viewPeriod.start, viewPeriod.end);
    }
    this.viewPeriod = viewPeriod;
  }

  private initEvents(start: Date, end: Date): void {
    this.safeSub(
      this.eventService.list(start, end).subscribe((events: Event[]) => {
        this.events = events.map((event: Event) => {
          event.start = new Date(event.start);
          event.end = event.end ? new Date(event.end) : undefined;
          return event;
        });
      })
    );
  }

  private setViewMenuItems(): void {
    this.viewMenuItems = [
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

  private configDialog(data?: Event): DynamicDialogConfig<Event> {
    return {
      data: data,
      focusOnShow: false,
      draggable: true,
    };
  }
}
