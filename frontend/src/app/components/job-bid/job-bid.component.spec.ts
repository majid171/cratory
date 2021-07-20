import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBidComponent } from './job-bid.component';

describe('JobBidComponent', () => {
  let component: JobBidComponent;
  let fixture: ComponentFixture<JobBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
