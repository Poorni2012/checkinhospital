import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private isEmailLogin = JSON.parse(localStorage.getItem('isAdminLogin') || ('false'));

  constructor() { }


  setLoginStatus() {
    localStorage.setItem('isAdminLogin', 'true');
  }

  get LoginStatus() {
    return JSON.parse(localStorage.getItem('isAdminLogin') ||
      this.isEmailLogin.toString());
  }
}
