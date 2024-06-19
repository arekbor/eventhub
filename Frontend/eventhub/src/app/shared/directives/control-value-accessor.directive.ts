import { Directive, Inject, Injector, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators,
} from "@angular/forms";
import { throwError } from "rxjs";

@Directive({
  selector: "[appControlValueAccessor]",
})
export class ControlValueAccessorDirective<T>
  implements ControlValueAccessor, OnInit
{
  public control: FormControl | undefined;
  public isRequired = false;
  public isDisabled = false;
  public onTouched: () => T;
  public onChange: (val: T | null) => T;
  public value: T;

  constructor(@Inject(Injector) private injector: Injector) {}

  ngOnInit(): void {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => T): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private setFormControl(): void {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);

          break;
        default:
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
      }
    } catch (err) {
      throwError(() => err);
      this.control = new FormControl();
    }
  }
}
