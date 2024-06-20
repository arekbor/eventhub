import { Component, Input, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputType } from "@core/utils/input.type";
import { ControlValueAccessorDirective } from "@shared/directives/control-value-accessor.directive";

@Component({
  selector: "app-input",
  templateUrl: "input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> {
  @Input({ required: true }) type: InputType;
  @Input({ required: true }) label: string;
  @Input({ required: true }) inputId: string;
  @Input() isLoading: boolean;
}
