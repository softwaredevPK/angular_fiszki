// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  _canActivate: boolean = false

  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    this.auth.isLoggedIn$.subscribe((response) => {
      this._canActivate = response
    })
    if (!this._canActivate) {
      this.router.navigate(['log-in']);
      return false;
    }
    return true;
  }
}