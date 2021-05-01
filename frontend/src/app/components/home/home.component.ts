import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  logout(e): void {
    e.preventDefault();

    this._auth.logout().subscribe((res) => {
      console.log(res);
    }), (err) => {
      console.log(err);
    };
  }

}
