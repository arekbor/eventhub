import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "@modules/auth/auth-routing.module";
import { LogoComponent } from "@modules/auth/components/logo/logo.component";
import { LoginComponent } from "@modules/auth/pages/login/login.component";
import { RegisterComponent } from "@modules/auth/pages/register/register.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoComponent],
  imports: [AuthRoutingModule, SharedModule.forRoot()],
})
export class AuthModule {}
