import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvelopeTutorialComponent } from './envelope-tutorial.component';

describe('EnvelopeTutorialComponent', () => {
  let component: EnvelopeTutorialComponent;
  let fixture: ComponentFixture<EnvelopeTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvelopeTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvelopeTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
