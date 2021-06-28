import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-about-issuer',
  templateUrl: './job-about-issuer.component.html',
  styleUrls: ['./job-about-issuer.component.scss']
})
export class JobAboutIssuerComponent implements OnInit {

  @Input() name: string;
  @Input() location: string;
  @Input() rating: number;
  @Input() joinDate: string;

  numberOfFilledStars: number;
  numberOfEmptyStars: number;
  hasHalfStar: boolean;
  starArray: number[] = [1, 2, 3, 4, 5];

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.calculateStarCounts();
  }

  calculateStarCounts(): void {
    this.numberOfFilledStars = Math.floor(this.rating);
    this.numberOfEmptyStars = 5 - Math.ceil(this.rating);
    this.hasHalfStar = this.rating % 1 !== 0;
  }

  handleViewProfile(): void {
    console.log('Navigating to profile...');
  }

}
