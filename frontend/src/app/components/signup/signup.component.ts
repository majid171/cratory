import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  showErrorMessage: boolean;

  constructor(private _auth: AuthService, private _fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this._fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
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
