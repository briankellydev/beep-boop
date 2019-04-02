import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioService } from './audio.service';
import { StaticSynthComponent } from './static-synth/static-synth.component';
import { VolumeComponent } from './volume/volume.component';
import { RedLightComponent } from './red-light/red-light.component';
import { SynthService } from './synth.service';
import { LfoComponent } from './lfo/lfo.component';
import { EnvelopeComponent } from './envelope/envelope.component';
import { OscillatorComponent } from './oscillator/oscillator.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticSynthComponent,
    VolumeComponent,
    RedLightComponent,
    LfoComponent,
    EnvelopeComponent,
    OscillatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AudioService, SynthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
