import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeepBlasterComponent } from './beep-blaster/beep-blaster.component';
import { SequencerModule } from '../sequencer/sequencer.module';
import { SynthesizerModule } from '../synthesizer/synthesizer.module';
import { BoomBoomComponent } from './boom-boom/boom-boom.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BeepBlasterComponent,
    BoomBoomComponent
  ],
  imports: [
    CommonModule,
    SequencerModule,
    SynthesizerModule,
    SharedModule,
  ],
  exports: [
    BeepBlasterComponent,
    BoomBoomComponent
  ],
  entryComponents: [
    BeepBlasterComponent,
    BoomBoomComponent
  ]
})
export class InstrumentsModule { }
