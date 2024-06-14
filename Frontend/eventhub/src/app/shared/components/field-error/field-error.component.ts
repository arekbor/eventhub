import { Component, Input } from "@angular/core";

@Component({
  selector: "app-field-error",
  templateUrl: "field-error.component.html",
})
export class FieldErrorComponent {
  @Input({ required: true }) errors: string[] | null;
}
