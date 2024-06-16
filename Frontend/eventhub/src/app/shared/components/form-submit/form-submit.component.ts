import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-submit",
  templateUrl: "form-submit.component.html",
})
export class FormSubmitComponent {
  @Input({ required: true }) form: FormGroup;
  @Output() validSubmit = new EventEmitter<void>();

  protected onClick() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.validSubmit.emit();
    }
  }
}
