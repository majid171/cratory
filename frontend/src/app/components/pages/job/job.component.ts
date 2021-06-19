import { Component, OnInit } from '@angular/core';

import {JobStatus} from "../../../enums";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  title: string = "I need someone to take care of my lawn";
  description: string = "I need someone to come cut my grass and take care of my entire yard. Ikbjlfgjidfgbjfdsnjgfdsjhgnhfvghjmgjdfhmgvjdhmjldmhjdnjdnfjchnmjrvhndfgjbmrhjtipodfnkjrepigfomgjpreihuibfdjnsvkmfogjrie0hubfidjnv skmgjriehufkmpijrt0eghu9ijnsvkdfmipjwrt0hueg9figjre0hu9fijpew08ghru9bifdjnmsigjrh0u9ebihjngm grenioreug r ger ger g reg reg r hrt hrtngoui need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard. I need someone to come cut my grass and take care of my entire yard.";
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
