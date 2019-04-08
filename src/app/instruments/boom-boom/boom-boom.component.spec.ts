import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoomBoomComponent } from './boom-boom.component';

describe('BoomBoomComponent', () => {
  let component: BoomBoomComponent;
  let fixture: ComponentFixture<BoomBoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoomBoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoomBoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
