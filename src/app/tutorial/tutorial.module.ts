import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialLandingComponent } from './tutorial-landing/tutorial-landing.component';
import { MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicRundownComponent } from './basic-rundown/basic-rundown.component';
import { NoobTutorialComponent } from './noob-tutorial/noob-tutorial.component';
import { RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { AudioBasicsComponent } from './audio-basics/audio-basics.component';
import { FiltersTutorialComponent } from './filters-tutorial/filters-tutorial.component';
import { LfoTutorialComponent } from './lfo-tutorial/lfo-tutorial.component';
import { EnvelopeTutorialComponent } from './envelope-tutorial/envelope-tutorial.component';
import { FxComponent } from './fx/fx.component';
import { SequencingComponent } from './sequencing/sequencing.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { SynthesizerModule } from '../synthesizer/synthesizer.module';

@NgModule({
  declarations: [
    TutorialLandingComponent,
    BasicRundownComponent,
    NoobTutorialComponent,
    HistoryComponent,
    AudioBasicsComponent,
    FiltersTutorialComponent,
    LfoTutorialComponent,
    EnvelopeTutorialComponent,
    FxComponent,
    SequencingComponent,
    AdvancedComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    RouterModule,
    SynthesizerModule
  ]
})
export class TutorialModule { }
