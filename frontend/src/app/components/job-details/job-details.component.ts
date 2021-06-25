import { Component, Input, OnInit } from '@angular/core';

import { Price } from '../../types';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  @Input() price: Price;
  @Input() description: string;
  @Input() skills: string[];
  @Input() title: string;
  @Input() location: string;
  @Input() date: string;

  constructor() { }

  ngOnInit(): void {
  }

}
