import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthfakeauthenticationService } from '../services/authfake.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthfakeauthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // L'utilisateur est authentifié, donc autoriser l'accès à la route
      return true;
    }

    // L'utilisateur n'est pas authentifié, rediriger vers la page de connexion
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
