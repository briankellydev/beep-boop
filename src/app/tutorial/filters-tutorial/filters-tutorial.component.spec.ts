import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersTutorialComponent } from './filters-tutorial.component';

describe('FiltersTutorialComponent', () => {
  let component: FiltersTutorialComponent;
  let fixture: ComponentFixture<FiltersTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
