import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ =  this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService) { 
    const token = localStorage.getItem('token')
    // todo missing expiration date of token
    this._isLoggedIn$.next(!!token)
  }

  login(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap((response: any) => {
        console.log(response)
        console.log('tutaj')
        this._isLoggedIn$.next(true);
        localStorage.setItem('token', response.auth_token);
      })
    )
  }

  register(email: string, password: string) {
    return this.apiService.register(email, password)
  }

  logout() {
    return this.apiService.logout().pipe(
      tap((response: any) => {
        console.log('logout')
        this._isLoggedIn$.next(false);
        localStorage.removeItem('token');
      })
    )
  }
}
