import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedLightComponent } from './red-light/red-light.component';

@NgModule({
  declarations: [
    RedLightComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RedLightComponent,
  ]
})
export class SharedModule { }
