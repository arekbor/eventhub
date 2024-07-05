import { Component, Input, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { ControlValueAccessorDirective } from "@shared/directives/control-value-accessor.directive";

@Component({
  selector: "app-checkbox",
  templateUrl: "checkbox.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent<T> extends ControlValueAccessorDirective<T> {
  @Input({ required: true }) label: string;
  @Input() enabled = true;
}
