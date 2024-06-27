import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "@core/services/user.service";
import { MenuItem } from "primeng/api";
import { Sidebar } from "primeng/sidebar";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
  protected items: MenuItem[] | undefined;
  protected sidebarVisible = false;

  protected isUserLogged: boolean;
  protected username: string;

  @ViewChild("sidebarRef") protected sidebarRef: Sidebar;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initUser();
    this.initItems();
  }

  protected onLogout(): void {
    this.userService.logout();
  }

  protected onCloseSidebar(event: Event): void {
    this.sidebarRef.close(event);
  }

  private initUser(): void {
    this.isUserLogged = this.userService.isLogged();

    const unique_name = this.userService.getClaims()?.unique_name;
    if (unique_name) {
      this.username = unique_name;
    }
  }

  private initItems(): void {
    this.items = [
      {
        label: "Home",
        icon: "pi pi-home",
        routerLink: "home",
      },
    ];
  }
}
