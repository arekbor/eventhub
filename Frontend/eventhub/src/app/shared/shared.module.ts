import { CommonModule } from "@angular/common";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppPrimeNgModule } from "@app/app.primeng.module";
import { FormSubmitComponent } from "@shared/components/form-submit/form-submit.component";
import { InputComponent } from "@shared/components/input/input.component";
import { ValidationErrorsComponent } from "@shared/components/validation-errors/validation-errors.component";
import { MessageService } from "primeng/api";

@NgModule({
  imports: [CommonModule, AppPrimeNgModule, FormsModule, ReactiveFormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi()), MessageService],
  declarations: [
    InputComponent,
    ValidationErrorsComponent,
    FormSubmitComponent,
  ],
  exports: [
    CommonModule,
    AppPrimeNgModule,
    RouterModule,
    ReactiveFormsModule,
    InputComponent,
    FormSubmitComponent,
  ],
})
export class SharedModule {}
