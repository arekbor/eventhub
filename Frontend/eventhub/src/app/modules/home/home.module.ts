import { NgModule } from "@angular/core";
import { EventDialogComponent } from "@modules/home/components/event-dialog/event-dialog.component";
import { HomeRoutingModule } from "@modules/home/home-routing.module";
import { HomeComponent } from "@modules/home/pages/home/home.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [HomeComponent, EventDialogComponent],
  imports: [HomeRoutingModule, SharedModule.forRoot()],
})
export class HomeModule {}
