import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material';
import { InstrumentsModule } from './instruments/instruments.module';
import { RackComponent } from './app-module/rack/rack.component';
import { TimelineComponent } from './app-module/timeline/timeline.component';
import { TransportComponent } from './app-module/transport/transport.component';
import { RenderingModalComponent } from './app-module/rendering-modal/rendering-modal.component';
import { SharedModule } from './shared/shared.module';
import { AppWrapperComponent } from './app-module/app-wrapper/app-wrapper.component';
import { TutorialModule } from './tutorial/tutorial.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RackComponent,
    TimelineComponent,
    TransportComponent,
    RenderingModalComponent,
    AppWrapperComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    InstrumentsModule,
    SharedModule,
    TutorialModule,
    HttpClientModule
  ],
  entryComponents: [
    RenderingModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
