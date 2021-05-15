import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/']);
    }
  }

  loginWithGoogle(): void {
    this._auth.loginWithGoogle();
  }

  loginWithFacebook(): void {
    this._auth.loginWithFacebook();
  }
}
