import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoobTutorialComponent } from './noob-tutorial.component';

describe('NoobTutorialComponent', () => {
  let component: NoobTutorialComponent;
  let fixture: ComponentFixture<NoobTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoobTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoobTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
