import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EventBody } from "@core/models/event-body.model";
import { Event } from "@core/models/event.model";
import { EventService } from "@core/services/event.service";
import { FormGroupControl } from "@core/utils/form-group-control.type";
import { BaseComponent } from "@modules/base.component";
import { Perform } from "@modules/perform";
import { FormControls } from "@shared/utils/form-controls";
import { addHours } from "date-fns";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { of, switchMap } from "rxjs";

@Component({
  selector: "app-event-dialog",
  templateUrl: "event-dialog.component.html",
})
export class EventDialogComponent extends BaseComponent implements OnInit {
  protected event: Event | undefined;
  protected form: FormGroup<FormGroupControl<EventBody>>;

  protected eventPerform: Perform<void> = new Perform<void>();

  constructor(
    private config: DynamicDialogConfig<Event>,
    private eventService: EventService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.initEvent();
  }

  protected onSubmit(): void {
    this.safeSub(
      this.eventPerform
        .load(
          of(this.event).pipe(
            switchMap((event: Event | undefined) => {
              if (event) {
                return this.eventService.update(
                  event.id as string,
                  this.form.getRawValue()
                );
              }
              return this.eventService.create(this.form.getRawValue());
            })
          ),
          false
        )
        .subscribe((): void => {
          window.location.reload();
        })
    );
  }

  protected onDeleteEvent(): void {
    if (this.event) {
      this.safeSub(
        this.eventPerform
          .load(this.eventService.delete(this.event.id as string), false)
          .subscribe((): void => {
            window.location.reload();
          })
      );
    }
  }

  private initEvent(): void {
    this.event = this.config.data;

    if (this.event) {
      this.updateForm(this.event);
    }
  }

  private updateForm(event: Event): void {
    this.form.setValue({
      title: event.title,
      allDay: event.allDay ?? false,
      start: event.start,
      end: event.end,
      description: event.description,
    });
  }

  private initForm(): void {
    const startDate = new Date();
    const endDate = addHours(startDate, 1);

    this.form = new FormGroup<FormGroupControl<EventBody>>({
      allDay: FormControls.boolean(),
      title: FormControls.title(),
      start: FormControls.date(startDate),
      end: FormControls.date(endDate),
      description: FormControls.description(),
    });
  }
}
