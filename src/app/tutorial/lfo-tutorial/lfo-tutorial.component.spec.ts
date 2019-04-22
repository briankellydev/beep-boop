import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LfoTutorialComponent } from './lfo-tutorial.component';

describe('LfoTutorialComponent', () => {
  let component: LfoTutorialComponent;
  let fixture: ComponentFixture<LfoTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LfoTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LfoTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
