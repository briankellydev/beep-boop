import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelayComponent } from './delay/delay.component';
import { DistortionComponent } from './distortion/distortion.component';
import { EnvelopeComponent } from './envelope/envelope.component';
import { FilterComponent } from './filter/filter.component';
import { LfoComponent } from './lfo/lfo.component';
import { OscillatorComponent } from './oscillator/oscillator.component';
import { ReverbComponent } from './reverb/reverb.component';
import { StaticSynthComponent } from './static-synth/static-synth.component';
import { MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SequencerModule } from '../sequencer/sequencer.module';
import { DrumMachineComponent } from './drum-machine/drum-machine.component';

@NgModule({
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    SharedModule,
    SequencerModule
  ],
  declarations: [
    DelayComponent,
    DistortionComponent,
    EnvelopeComponent,
    FilterComponent,
    LfoComponent,
    OscillatorComponent,
    ReverbComponent,
    StaticSynthComponent,
    DrumMachineComponent,
  ],
  exports: [
    StaticSynthComponent,
    DrumMachineComponent,
    FilterComponent,
    LfoComponent,
    EnvelopeComponent
  ]
})
export class SynthesizerModule { }
