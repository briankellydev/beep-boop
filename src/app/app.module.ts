import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioService } from './audio.service';
import { SynthService } from './synth.service';
import { MatSlideToggleModule } from '@angular/material';
import { InstrumentsModule } from './instruments/instruments.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    InstrumentsModule,
  ],
  providers: [AudioService, SynthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
