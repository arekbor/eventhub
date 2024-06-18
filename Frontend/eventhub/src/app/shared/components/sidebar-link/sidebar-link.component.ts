import { Component, Input, forwardRef } from "@angular/core";
import { ROUTER_INITIALIZER } from "@angular/router";

@Component({
  selector: "app-sidebar-link",
  templateUrl: "sidebar-link.component.html",
  providers: [
    {
      provide: ROUTER_INITIALIZER,
      useExisting: forwardRef(() => SidebarLinkComponent),
      multi: true,
    },
  ],
})
export class SidebarLinkComponent {
  @Input() icon: string;
}
