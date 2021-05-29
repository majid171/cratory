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
      email: new FormControl('majid@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('123', [Validators.required])
    });
  }

  login(): void {
    if(!this.form.valid){
      return;
    }
    
    const stringField = JSON.stringify(this.form.value);
    const jsonField = JSON.parse(stringField);

    this._auth.login(jsonField).subscribe((res) => {
      this._router.navigate(['/'])
      console.log(res);
    }), (err) => {
      console.log(err);
    };
  }

  loginWithGoogle(): void {
    this._auth.loginWithGoogle();
  }

  loginWithFacebook(): void {
    this._auth.loginWithFacebook();
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

  temp(): void {
    this._auth.isAuthenticated().subscribe((res) => {
      console.log(res);
    }), (err) => {
      console.log(err);
    };
  }
}
