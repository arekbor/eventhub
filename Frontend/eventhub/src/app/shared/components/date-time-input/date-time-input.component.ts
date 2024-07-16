import { Component, Input, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { ControlValueAccessorDirective } from "@shared/directives/control-value-accessor.directive";

@Component({
  selector: "app-date-time-input",
  templateUrl: "date-time-input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeInputComponent),
      multi: true,
    },
  ],
})
export class DateTimeInputComponent<
  T
> extends ControlValueAccessorDirective<T> {
  @Input({ required: true }) label: string;
  @Input({ required: true }) inputId: string;
  @Input() appendTo: string;
  @Input() minDate: Date | undefined;
  @Input() maxDate: Date | undefined;
  @Input() showTime = true;
  @Input() isLoading = false;
  @Input() readonly: boolean;
}
