import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelayComponent } from './delay/delay.component';
import { DistortionComponent } from './distortion/distortion.component';
import { EnvelopeComponent } from './envelope/envelope.component';
import { FilterComponent } from './filter/filter.component';
import { LfoComponent } from './lfo/lfo.component';
import { OscillatorComponent } from './oscillator/oscillator.component';
import { PortamentoComponent } from './portamento/portamento.component';
import { ReverbComponent } from './reverb/reverb.component';
import { StaticSynthComponent } from './static-synth/static-synth.component';
import { VolumeComponent } from './volume/volume.component';
import { MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DelayComponent,
    DistortionComponent,
    EnvelopeComponent,
    FilterComponent,
    LfoComponent,
    OscillatorComponent,
    PortamentoComponent,
    ReverbComponent,
    StaticSynthComponent,
    VolumeComponent,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    StaticSynthComponent
  ]
})
export class SynthesizerModule { }
