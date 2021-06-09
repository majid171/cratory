import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  @Input() title: String;
  @Input() description: String;
  @Input() price: Number;
  @Input() skills: String[];
  @Input() issuer: String;

  constructor() { }

  ngOnInit(): void {
  }
}
