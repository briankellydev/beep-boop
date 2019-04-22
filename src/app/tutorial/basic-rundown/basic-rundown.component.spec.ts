import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRundownComponent } from './basic-rundown.component';

describe('BasicRundownComponent', () => {
  let component: BasicRundownComponent;
  let fixture: ComponentFixture<BasicRundownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicRundownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicRundownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
