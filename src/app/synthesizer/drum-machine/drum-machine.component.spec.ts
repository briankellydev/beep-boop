import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumMachineComponent } from './drum-machine.component';

describe('DrumMachineComponent', () => {
  let component: DrumMachineComponent;
  let fixture: ComponentFixture<DrumMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrumMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
