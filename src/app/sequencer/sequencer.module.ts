import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequencerComponent } from './sequencer/sequencer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      SequencerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
      SequencerComponent,
  ]
})
export class SequencerModule { }
