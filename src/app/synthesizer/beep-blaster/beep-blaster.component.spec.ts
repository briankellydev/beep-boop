import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeepBlasterComponent } from './beep-blaster.component';

describe('BeepBlasterComponent', () => {
  let component: BeepBlasterComponent;
  let fixture: ComponentFixture<BeepBlasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeepBlasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeepBlasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
