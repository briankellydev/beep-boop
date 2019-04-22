import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderingModalComponent } from './rendering-modal.component';

describe('RenderingModalComponent', () => {
  let component: RenderingModalComponent;
  let fixture: ComponentFixture<RenderingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
