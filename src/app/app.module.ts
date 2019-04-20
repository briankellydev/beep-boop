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
import { RenderingModalComponent } from './rendering-modal/rendering-modal.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    RackComponent,
    TimelineComponent,
    TransportComponent,
    RenderingModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    InstrumentsModule,
    SharedModule
  ],
  entryComponents: [
    RenderingModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
