import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  @Input() skills: string[];
  @Input() issuer: string;
  @Input() location: string;
  @Input() date: string;
  @Input() rating: number;

  showCompressedSkills: boolean;
  showSmallPrice: boolean;
  numberOfExtraSkills: number;
  skillsCopy: string[];
  numberOfFilledStars: number;
  numberOfEmptyStars: number;
  hasHalfStar: boolean;
  starArray: number[] = [1, 2, 3, 4, 5];
  showRating: boolean;

  constructor() { }

  ngOnInit(): void {
    this.skillsCopy = this.skills;
    this.numberOfExtraSkills = this.skills.length - 2;
    this.canShowCompressedLists();
    this.canShowSmallPrice();
    this.calculateStarCounts();
    this.checkIfShowRating();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canShowCompressedLists();
    this.canShowSmallPrice();
    this.checkIfShowRating();
  }

  canShowCompressedLists(): void {
    if (window.screen.width < 769 && this.skills.length > 2) {
      this.showCompressedSkills = true;
      this.skillsCopy = this.skillsCopy.slice(0, 2);
    }
    else {
      this.showCompressedSkills = false;
      this.skillsCopy = this.skills;
    }
  }

  canShowSmallPrice(): void {
    if (window.screen.width <= 1024) {
      this.showSmallPrice = true;
    }
    else {
      this.showSmallPrice = false;
    }
  }

  calculateStarCounts(): void {
    this.numberOfFilledStars = Math.floor(this.rating);
    this.numberOfEmptyStars = 5 - Math.ceil(this.rating);
    this.hasHalfStar = this.rating % 1 !== 0;
  }

  checkIfShowRating(): void {
    if (window.screen.width > 200) {
      this.showRating = true;
    }
    else {
      this.showRating = false;
    }
  }
}
