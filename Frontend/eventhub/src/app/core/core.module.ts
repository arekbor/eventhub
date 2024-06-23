import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { AuthInterceptor } from "@core/interceptors/auth.interceptor";
import { ErrorInterceptor } from "@core/interceptors/error.interceptor";
import { StorageService } from "@core/services/storage.service";
import { UserService } from "@core/services/user.service";
import { SharedModule } from "@shared/shared.module";

const HttpInterceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [SharedModule.forRoot()],
  providers: [
    HttpInterceptors,
    UserService,
    StorageService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
})
export class CoreModule {}
