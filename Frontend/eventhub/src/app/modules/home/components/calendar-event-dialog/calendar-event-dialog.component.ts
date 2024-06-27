import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Event } from "@core/models/event.model";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { FormControls } from "@shared/utils/form-controls";
import { CalendarEvent } from "angular-calendar";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: "app-calendar-event-dialog",
  templateUrl: "calendar-event-dialog.component.html",
})
export class CalendarEventDialogComponent implements OnInit {
  protected calendarEvent: CalendarEvent<unknown> | undefined;
  protected form: FormGroup<FormGroupControl<Event>>;

  constructor(private config: DynamicDialogConfig<CalendarEvent<unknown>>) {}

  ngOnInit(): void {
    this.initForm();
    this.initCalendarEvent();
  }

  protected onSubmit(): void {
    throw new Error("Not implemented");
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<Event>>({
      allDay: FormControls.boolean(),
      title: FormControls.title(),
      rangeDates: FormControls.rangeDates(),
    });
  }

  private initCalendarEvent(): void {
    this.calendarEvent = this.config.data;

    if (this.calendarEvent) {
      this.updateForm(this.calendarEvent);
    }
  }

  private updateForm(calendarEvent: CalendarEvent<unknown>): void {
    this.form.setValue({
      title: calendarEvent.title,
      allDay: calendarEvent.allDay ?? false,
      rangeDates: [calendarEvent.start, calendarEvent.end!],
    });
  }
}
