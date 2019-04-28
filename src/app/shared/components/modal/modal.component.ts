import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
    @ViewChild('modal', {read: ViewContainerRef}) modalContent: ViewContainerRef;
    modalValue: any;

    private subscriptions: Subscription[] = []
    
    constructor(
        private modalService: ModalService,
        private cfr: ComponentFactoryResolver,
        ) {}

    ngOnInit() {
        this.subscriptions.push(
            this.modalService.modalContent.subscribe((modal) => {
                this.modalValue = modal;
                this.modalContent.clear();
                if (modal) {
                    const compFactory = this.cfr.resolveComponentFactory(modal.component);
                    this.modalContent.createComponent(compFactory);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub: Subscription) => {
            sub.unsubscribe();
        });
    }

    closeModal() {
        this.modalService.modalContent.next(null);
    }


}