import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticSynthComponent } from './static-synth.component';

describe('StaticSynthComponent', () => {
  let component: StaticSynthComponent;
  let fixture: ComponentFixture<StaticSynthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticSynthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticSynthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
