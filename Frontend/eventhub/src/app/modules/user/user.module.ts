import { NgModule } from "@angular/core";
import { PasswordComponent } from "@modules/user/pages/password/password.component";
import { ProfileComponent } from "@modules/user/pages/profile/profile.component";
import { UserRoutingModule } from "@modules/user/user-routing.module";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [ProfileComponent, PasswordComponent],
  imports: [UserRoutingModule, SharedModule],
})
export class UserModule {}
