import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedLightComponent } from './red-light/red-light.component';
import { SynthService } from './services/synth.service';
import { KnobComponent } from './components/knob/knob.component';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './components/modal/modal.component';

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
