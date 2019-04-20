import { ComponentFixture, TestBed, async, fakeAsync, tick } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, ComponentFactoryResolver, Component } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { ModalComponent } from "./modal.component";
import { ModalService } from "../services/modal.service";
import { Subject } from "rxjs";
import { MainMenuComponent } from "./main-menu.component";

xdescribe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    const modalService = {
        modalContent: new Subject<any>()
    };
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ ModalComponent ],
        providers: [
            {provide: ModalService, useValue: modalService},
            ComponentFactoryResolver
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize', fakeAsync(() => {
        modalService.modalContent.next({component: MainMenuComponent});
        tick();
        expect(component.modalValue).toEqual({component: MainMenuComponent});
    }));
});