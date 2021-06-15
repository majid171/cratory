import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  path: string;

  constructor(private readonly _router: Router) { }

  ngOnInit(): void {
    this.path = this._router.url;
  }

}
