import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "@core/services/user.service";

export const UserLoggedGuard: CanActivateFn = () => {
  const authService = inject(UserService);
  const router = inject(Router);

  if (!authService.isLogged()) {
    router.navigate(["auth/login"]);
    return false;
  }
  return true;
};
