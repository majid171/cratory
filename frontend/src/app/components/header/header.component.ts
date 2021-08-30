import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  accountName: string;

  ngOnInit(): void {
    this.accountName = "Majid";
  }
}
