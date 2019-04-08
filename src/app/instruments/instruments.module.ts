import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeepBlasterComponent } from './beep-blaster/beep-blaster.component';
import { SequencerModule } from '../sequencer/sequencer.module';
import { SynthesizerModule } from '../synthesizer/synthesizer.module';
import { BoomBoomComponent } from './boom-boom/boom-boom.component';

@NgModule({
  declarations: [
    BeepBlasterComponent,
    BoomBoomComponent
  ],
  imports: [
    CommonModule,
    SequencerModule,
    SynthesizerModule,
  ],
  exports: [
    BeepBlasterComponent,
    BoomBoomComponent
  ]
})
export class InstrumentsModule { }
