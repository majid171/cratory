import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonText: string;
  @Input() handler: any;
  @Input() type: string;
  @Input() buttonWidth: string;

  constructor() { }

  ngOnInit(): void {
  }

}
