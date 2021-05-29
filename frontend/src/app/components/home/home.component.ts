import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    if (window.location.hash === '#_=_') {
      window.location.hash = '';
    }
  }

  logout(e): void {
    e.preventDefault();

    this._auth.logout().subscribe((res) => {
      this._router.navigate(['/signin']);
    }), (err) => {
      console.log(err);
    };
  }

  temp(): void {
    this._auth.isAuthenticated().subscribe((res) => {
      console.log(res);
    }), (err) => {
      console.log(err);
    };
  }

}
