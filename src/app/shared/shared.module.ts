import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedLightComponent } from './red-light/red-light.component';
import { SynthService } from './synth.service';

@NgModule({
  declarations: [
    RedLightComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RedLightComponent,
  ],
  providers: [
    SynthService,
  ]
})
export class SharedModule { }
