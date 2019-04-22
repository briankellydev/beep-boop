import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioBasicsComponent } from './audio-basics.component';

describe('AudioBasicsComponent', () => {
  let component: AudioBasicsComponent;
  let fixture: ComponentFixture<AudioBasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioBasicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
