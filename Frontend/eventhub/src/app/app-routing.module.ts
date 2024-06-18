import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserLoggedGuard } from "@core/guards/user-logged.guard";
import { UserNotLoggedGuard } from "@core/guards/user-not-logged.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    canActivate: [UserLoggedGuard],
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("@modules/home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "user",
        loadChildren: () =>
          import("@modules/user/user.module").then((m) => m.UserModule),
      },
    ],
  },
  {
    path: "auth",
    canActivate: [UserNotLoggedGuard],
    loadChildren: () =>
      import("@modules/auth/auth.module").then((module) => module.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
