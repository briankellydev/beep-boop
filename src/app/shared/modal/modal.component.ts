import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ModalService } from './modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
    @ViewChild('modal', {read: ViewContainerRef}) modalContent: ViewContainerRef;
    modalValue: any;

    destroy$ = new Subject();
    
    constructor(
        private modalService: ModalService,
        private cfr: ComponentFactoryResolver,
        ) {}

    ngOnInit() {
        this.modalService.modalContent.pipe(takeUntil(this.destroy$)).subscribe((modal) => {
            this.modalValue = modal;
            this.modalContent.clear();
            if (modal) {
                const compFactory = this.cfr.resolveComponentFactory(modal.component);
                this.modalContent.createComponent(compFactory);
            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    closeModal() {
        this.modalService.modalContent.next(null);
    }


}