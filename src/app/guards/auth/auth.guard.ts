import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, take, map, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

//export const authGuard: CanActivateFn = (route, state) => {
//  return true;
//};

@Injectable({
  providedIn: 'root',
})
//version deprecada
export class authGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1), // Asegura que la suscripción solo se haga una vez
      map((isLoggedIn) => {
        
        if (!isLoggedIn) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }

  
}
