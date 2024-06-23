import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "@modules/home/home-routing.module";
import { HomeComponent } from "@modules/home/pages/home/home.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, SharedModule.forRoot()],
})
export class HomeModule {}
