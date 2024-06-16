import { NgModule } from "@angular/core";
import { LoginComponent } from "@modules/user/pages/login/login.component";
import { RegisterComponent } from "@modules/user/pages/register/register.component";
import { UserRoutingModule } from "@modules/user/user-routing.module";
import { SharedModule } from "@shared/shared.module";
import { LogoComponent } from "@modules/user/components/logo/logo.component";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoComponent],
  imports: [UserRoutingModule, SharedModule],
})
export class UserModule {}
