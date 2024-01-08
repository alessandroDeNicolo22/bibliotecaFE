import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterModule, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLogged()) {
      if(this.authService.isSessionExpired()){
        this.authService.logout();
        localStorage.setItem('sescaduta','1');
        this.router.navigate(['utente/login'])
        return false;
      }else{
        return true;
      }
    } else {
      localStorage.setItem('nonloggato','1');
      this.router.navigate(['utente/login']);
      return false;
    }
  }
}