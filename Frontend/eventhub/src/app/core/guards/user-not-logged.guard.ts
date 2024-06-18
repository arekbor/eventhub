import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "@core/services/user.service";

export const UserNotLoggedGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLogged()) {
    router.navigate(["/"]);
    return false;
  }
  return true;
};
