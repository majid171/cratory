import { Component, OnInit } from '@angular/core';

import {JobStatus} from "../../../enums";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  title: string = "I need someone to take care of my lawn";
  description: string = "I need someone to take care of my lawn. I need someone to take care of my lawn. I need someone to take care of my lawn. I need someone to take care of my lawn.";
  skills: string[] = ['CSS', 'HTML', 'Lawn Care', 'Wood Working', 'Painting'];
  date: string;
  price: string = "$150 CAD";
  issuer: string;
  status: JobStatus = JobStatus.OPEN;

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(): string {
    if(this.status === JobStatus.OPEN){
      return "status-open";
    }
    else{
      return "status-other";
    }
  }
}
