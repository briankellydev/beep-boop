import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ModalService {
    modalContent = new BehaviorSubject<{component: any, data: any}>(null);
}