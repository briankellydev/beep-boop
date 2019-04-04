import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioService } from './audio.service';
import { SynthService } from './synth.service';
import { MatSlideToggleModule } from '@angular/material';
import { SynthesizerModule } from './synthesizer/synthesizer.module';
import { SequencerModule } from './sequencer/sequencer.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    SynthesizerModule,
    SequencerModule
  ],
  providers: [AudioService, SynthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
