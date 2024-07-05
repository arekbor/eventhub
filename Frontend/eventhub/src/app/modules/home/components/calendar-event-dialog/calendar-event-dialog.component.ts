import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CalendarEventBody } from "@core/models/calendar-event-body.model";
import { CalendarEventService } from "@core/services/calendar-event.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { Perform } from "@modules/perform";
import { FormControls } from "@shared/utils/form-controls";
import { CalendarEvent } from "angular-calendar";
import { addHours } from "date-fns";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-calendar-event-dialog",
  templateUrl: "calendar-event-dialog.component.html",
})
export class CalendarEventDialogComponent
  extends BaseComponent
  implements OnInit
{
  protected calendarEvent: CalendarEvent<string> | undefined;
  protected form: FormGroup<FormGroupControl<CalendarEventBody>>;

  protected calendarEventPerfrom: Perform<void> = new Perform<void>();

  constructor(
    private config: DynamicDialogConfig<CalendarEvent<string>>,
    private ref: DynamicDialogRef,
    private calendarEventService: CalendarEventService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.initCalendarEvent();
  }

  protected onSubmit(): void {
    this.safeSub(
      this.calendarEventPerfrom
        .load(
          this.calendarEventService.createCalendarEvent(
            this.form.getRawValue()
          ),
          false
        )
        .subscribe((): void => {
          this.ref.close();
        })
    );
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
