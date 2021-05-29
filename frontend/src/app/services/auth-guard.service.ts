import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _auth: AuthService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this._auth.isAuthenticated().subscribe((res) => {
        if(res){
          resolve(true);
        }
        else{
          this._router.navigate(['/signin']);
          resolve(false);
        }
      },
        () => {
          this._router.navigate(['/signin']);
          resolve(false);
        });
    });
  }
}
