import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material';
import { InstrumentsModule } from './instruments/instruments.module';
import { RackComponent } from './components/rack/rack.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TransportComponent } from './components/transport/transport.component';

@NgModule({
  declarations: [
    AppComponent,
    RackComponent,
    TimelineComponent,
    TransportComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    InstrumentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
