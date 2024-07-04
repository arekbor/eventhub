import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CalendarEventBody } from "@core/models/calendar-event-body.model";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { FormControls } from "@shared/utils/form-controls";
import { CalendarEvent } from "angular-calendar";
import { addHours } from "date-fns";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-calendar-event-dialog",
  templateUrl: "calendar-event-dialog.component.html",
})
export class CalendarEventDialogComponent implements OnInit {
  protected calendarEvent: CalendarEvent<string> | undefined;
  protected form: FormGroup<FormGroupControl<CalendarEventBody>>;

  constructor(
    private config: DynamicDialogConfig<CalendarEvent<string>>,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initCalendarEvent();
  }

  protected onSubmit(): void {
    this.ref.close();
  }

  private initCalendarEvent(): void {
    this.calendarEvent = this.config.data;

    if (this.calendarEvent) {
      this.updateForm(this.calendarEvent);
    }
  }

  private updateForm(calendarEvent: CalendarEvent<string>): void {
    this.form.setValue({
      title: calendarEvent.title,
      allDay: calendarEvent.allDay ?? false,
      start: calendarEvent.start,
      end: calendarEvent.end,
      meta: calendarEvent.meta ?? null,
    });
  }

  private initForm(): void {
    const startDate = new Date();
    const endDate = addHours(startDate, 1);

    this.form = new FormGroup<FormGroupControl<CalendarEventBody>>({
      allDay: FormControls.boolean(),
      title: FormControls.title(),
      start: FormControls.date(startDate),
      end: FormControls.date(endDate),
      meta: FormControls.meta(),
    });
  }
}
