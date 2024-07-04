import { CommonModule } from "@angular/common";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { ModuleWithProviders, NgModule, Type } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppPrimeNgModule } from "@app/app.primeng.module";
import { DateTimeInputComponent } from "@shared/components/date-time-input/date-time-input.component";
import { FormSubmitComponent } from "@shared/components/form-submit/form-submit.component";
import { InputComponent } from "@shared/components/input/input.component";
import { SidebarLinkComponent } from "@shared/components/sidebar-link/sidebar-link.component";
import { ValidationErrorsComponent } from "@shared/components/validation-errors/validation-errors.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";

@NgModule({
  declarations: [
    InputComponent,
    DateTimeInputComponent,
    ValidationErrorsComponent,
    FormSubmitComponent,
    SidebarLinkComponent,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    DialogService,
  ],
  imports: [CommonModule, AppPrimeNgModule, FormsModule, ReactiveFormsModule],

  exports: [
    CommonModule,
    FormsModule,
    AppPrimeNgModule,
    RouterModule,
    ReactiveFormsModule,
    InputComponent,
    DateTimeInputComponent,
    FormSubmitComponent,
    SidebarLinkComponent,
  ],
})
export class SharedModule {
  static forRoot(): (
    | (unknown[] | Type<unknown>)
    | ModuleWithProviders<unknown>
  )[] {
    return [
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      SharedModule,
    ];
  }
}
