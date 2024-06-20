import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { AccessInterceptor } from "@core/interceptors/access.interceptor";
import { HttpService } from "@core/services/http.service";
import { StorageService } from "@core/services/storage.service";
import { UserService } from "@core/services/user.service";
import { SharedModule } from "@shared/shared.module";

const HttpInterceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AccessInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [SharedModule],
  providers: [
    HttpInterceptors,
    HttpService,
    UserService,
    StorageService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
})
export class CoreModule {}
