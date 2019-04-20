import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedLightComponent } from './red-light/red-light.component';
import { SynthService } from './synth.service';
import { KnobComponent } from './knob/knob.component';
import { ModalService } from './modal/modal.service';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    RedLightComponent,
    KnobComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RedLightComponent,
    KnobComponent,
    ModalComponent,
  ],
  providers: [
    SynthService,
    ModalService
  ]
})
export class SharedModule { }
