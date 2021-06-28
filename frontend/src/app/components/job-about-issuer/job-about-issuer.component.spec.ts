import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAboutIssuerComponent } from './job-about-issuer.component';

describe('JobAboutIssuerComponent', () => {
  let component: JobAboutIssuerComponent;
  let fixture: ComponentFixture<JobAboutIssuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAboutIssuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAboutIssuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
