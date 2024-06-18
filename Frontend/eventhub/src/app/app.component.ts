import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Sidebar } from "primeng/sidebar";
import { UserService } from "./core/services/user.service";

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

  constructor(private userService: UserService) {
    this.isUserLogged = this.userService.isLogged();

    const unique_name = this.userService.getClaims()?.unique_name;
    if (unique_name) {
      this.username = unique_name;
    }
  }

  ngOnInit(): void {
    this.initItems();
  }

  protected onLogout(): void {
    this.userService.logout();
  }

  protected onCloseSidebar(event: Event): void {
    this.sidebarRef.close(event);
  }

  private initItems(): void {
    this.items = [
      {
        label: "Home",
        icon: "pi pi-home",
      },
      {
        label: "Events",
        icon: "pi pi-calendar",
      },
    ];
  }
}
