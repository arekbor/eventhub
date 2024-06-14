import { Component } from "@angular/core";
import { AuthService } from "@core/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent {
  protected isLogged: boolean;

  constructor(private authService: AuthService) {}

  private initUser(): void {
    this.isLogged = this.authService.isLogged();
  }
}
