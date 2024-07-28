import { Component, OnInit } from "@angular/core";
import { CalendarSettingsBody } from "@core/models/calendar-settings-body.model";
import { Event } from "@core/models/event.model";
import { CalendarSettingsService } from "@core/services/calendar-settings.service";
import { EventService } from "@core/services/event.service";
import { StorageService } from "@core/services/storage.service";
import { BaseComponent } from "@modules/base.component";
import { EventDialogComponent } from "@modules/calendar/components/event-dialog/event-dialog.component";
import {
  CalendarEvent,
  CalendarView,
  CalendarViewPeriod,
} from "angular-calendar";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { Perform } from "../../../perform";

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

  protected calendarSettingsPerform = new Perform<void>();

  private previousViewPeriod: CalendarViewPeriod;

  constructor(
    private dialogService: DialogService,
    private eventService: EventService,
    private calendarSettingsService: CalendarSettingsService,
    private storageService: StorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initView();
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
          this.updateView(CalendarView.Day);
        },
      },
      {
        label: "Week",
        command: () => {
          this.updateView(CalendarView.Week);
        },
      },
      {
        label: "Month",
        command: () => {
          this.updateView(CalendarView.Month);
        },
      },
    ];
  }

  private updateView(view: CalendarView): void {
    const body = {
      calendarView: view,
      primaryColor: this.storageService.getPrimaryColor(),
      secondaryColor: this.storageService.getSecondaryColor(),
    } as CalendarSettingsBody;

    this.safeSub(
      this.calendarSettingsPerform
        .load(this.calendarSettingsService.updateCalendarSettings(body))
        .subscribe((): void => {
          this.setView(view);
          this.storageService.setCalendarView(view);
        })
    );
  }

  private initView(): void {
    const view = this.storageService.getCalendarView();
    if (view) {
      this.setView(view as CalendarView);
    }
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
