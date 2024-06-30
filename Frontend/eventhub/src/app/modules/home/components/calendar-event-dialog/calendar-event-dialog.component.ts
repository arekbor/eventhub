import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CalendarEventBody } from "@core/models/calendar-event-body.model";
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
  protected form: FormGroup<FormGroupControl<CalendarEventBody>>;

  protected selectedMoments: Date[] = [];
  protected isAllDay: boolean;

  constructor(private config: DynamicDialogConfig<CalendarEvent<unknown>>) {}

  ngOnInit(): void {
    this.initForm();
    this.initCalendarEvent();
  }

  protected onSubmit(): void {
    this.form.patchValue({
      allDay: this.isAllDay,
      start: this.selectedMoments[0],
      end: this.isAllDay ? undefined : this.selectedMoments[1],
    });

    console.log(this.form.getRawValue());
  }

  private initForm(): void {
    this.form = new FormGroup<FormGroupControl<CalendarEventBody>>({
      allDay: FormControls.boolean(),
      title: FormControls.title(),
      start: FormControls.date(),
      end: FormControls.date(),
    });
  }

  private initCalendarEvent(): void {
    this.calendarEvent = this.config.data;

    if (this.calendarEvent) {
      this.updateForm(this.calendarEvent);

      this.selectedMoments = [
        this.calendarEvent.start,
        this.calendarEvent.end!,
      ];
    }
  }

  private updateForm(calendarEvent: CalendarEvent<unknown>): void {
    this.form.setValue({
      title: calendarEvent.title,
      allDay: calendarEvent.allDay ?? false,
      start: calendarEvent.start,
      end: calendarEvent.end,
    });
  }
}
