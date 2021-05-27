import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showErrorMessage: boolean;

  constructor(private _auth: AuthService, private _router: Router, private _fb: FormBuilder) { }

  ngOnInit(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/']);
    }

    this.form = this._fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit(): void {
    const stringField = JSON.stringify(this.form.value);
    const jsonField = JSON.parse(stringField);
  }

  loginWithGoogle(): void {
    this._auth.loginWithGoogle();
  }

  loginWithFacebook(): void {
    this._auth.loginWithFacebook();
  }
}
