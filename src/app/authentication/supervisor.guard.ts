import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


export const supervisorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if(authService.isSupervisorOrAbove()){
    return true;
  }else{
    localStorage.setItem('nopermessi','1')
    router.navigate([''])
    return true;
  }
};