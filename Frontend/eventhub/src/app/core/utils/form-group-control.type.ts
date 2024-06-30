import { FormControl } from "@angular/forms";

export type FormGroupControl<T> = {
  [K in keyof T]: T[K] extends object ? FormControl<T[K]> : FormControl<T[K]>;
};
