import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ErrorInterceptor } from "@core/interceptors/error.interceptor";
import { HttpService } from "@core/services/http.service";
import { UserService } from "@core/services/user.service";
import { SharedModule } from "@shared/shared.module";

const HttpInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

@NgModule({
  imports: [SharedModule],
  providers: [HttpService, UserService, HttpInterceptors],
})
export class CoreModule {}
