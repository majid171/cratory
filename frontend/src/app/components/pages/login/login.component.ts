import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showErrorMessage: boolean = false;

  constructor(private _auth: AuthService, private _router: Router, private _fb: FormBuilder) { }

  ngOnInit(): void {
    if (this._auth.isAuthenticated()) {
      this._router.navigate(['/']);
    }

    this.form = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  signIn(): void {
    if(!this.form.valid){
      return;
    }
    
    const stringField = JSON.stringify(this.form.value);
    const jsonField = JSON.parse(stringField);

    this._auth.signIn(jsonField).subscribe((res) => {
      this._router.navigate(['/'])
    }, () => {
      this.showErrorMessage = true;
    });
  }

  signInWithGoogle(): void {
    this._auth.signInWithGoogle();
  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook();
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }
}
