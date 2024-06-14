import { CommonModule } from "@angular/common";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppPrimeNgModule } from "@app/app.primeng.module";
import { EventHubImgLogoComponent } from "@shared/components/event-hub-img-logo/event-hub-img-logo.component";
import { FieldErrorComponent } from "@shared/components/field-error/field-error.component";
import { MessageService } from "primeng/api";

@NgModule({
  imports: [CommonModule, AppPrimeNgModule, FormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi()), MessageService],
  declarations: [FieldErrorComponent, EventHubImgLogoComponent],
  exports: [
    CommonModule,
    AppPrimeNgModule,
    RouterModule,
    ReactiveFormsModule,
    FieldErrorComponent,
    EventHubImgLogoComponent,
  ],
})
export class SharedModule {}
