import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialLandingComponent } from './tutorial-landing.component';

describe('TutorialLandingComponent', () => {
  let component: TutorialLandingComponent;
  let fixture: ComponentFixture<TutorialLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
