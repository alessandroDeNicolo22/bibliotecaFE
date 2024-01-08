import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
    if (authService.isAdmin()) {
      return true;
    } else {
      localStorage.setItem('nopermessi','2');
      router.navigate(['']);
      return false;
  };
}