import { Component, Input, OnInit } from '@angular/core';

import { JobStatus } from '../../enums';

@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.scss']
})
export class JobHeaderComponent implements OnInit {

  @Input() status: string;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(): string {
    if (this.status === JobStatus.OPEN) {
      return "status-open";
    }
    else {
      return "status-other";
    }
  }

}
