import { Injectable } from '@angular/core';
import { ActivatedRoute,Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public _router: Router,private router:ActivatedRoute) {}
  canActivate(): boolean {
    if (!localStorage.getItem('token')) {

      this._router.navigate(['']);
      return false;
    }
    { 
        return true;
    }
    
  }
}