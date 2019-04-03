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
import { FilterComponent } from './filter/filter.component';
import { DistortionComponent } from './distortion/distortion.component';
import { DelayComponent } from './delay/delay.component';
import { ReverbComponent } from './reverb/reverb.component';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    StaticSynthComponent,
    VolumeComponent,
    RedLightComponent,
    LfoComponent,
    EnvelopeComponent,
    OscillatorComponent,
    FilterComponent,
    DistortionComponent,
    DelayComponent,
    ReverbComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSlideToggleModule,
  ],
  providers: [AudioService, SynthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
