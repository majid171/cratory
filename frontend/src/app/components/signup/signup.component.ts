import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  showErrorMessage: boolean = false;
  hide: boolean = true;

  constructor(private _auth: AuthService, private _fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {

    this.form = this._fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  signUp(): void {

    if (!this.form.valid) return;

    const stringField = JSON.stringify(this.form.value);
    const jsonField = JSON.parse(stringField);

    this._auth.signUp(jsonField).subscribe((res) => {
      this._router.navigate(['/'])
    }, (err) => {
      this.showErrorMessage = true
    });
  }

  signInWithGoogle(): void {
    this._auth.signInWithGoogle();
  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook();
  }

  get firstName() { return this.form.get('firstName'); }

  get lastName() { return this.form.get('lastName'); }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }
}
