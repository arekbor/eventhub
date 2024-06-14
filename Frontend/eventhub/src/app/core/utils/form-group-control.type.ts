import { FormControl, FormGroup } from "@angular/forms";

export type FormGroupControl<T> = {
  [K in keyof T]: T[K] extends object
    ? FormGroup<FormGroupControl<T[K]>>
    : FormControl<T[K]>;
};
