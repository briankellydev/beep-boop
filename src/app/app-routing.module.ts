import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppWrapperComponent } from './app-module/app-wrapper/app-wrapper.component';
import { TutorialLandingComponent } from './tutorial/tutorial-landing/tutorial-landing.component';
import { BasicRundownComponent } from './tutorial/basic-rundown/basic-rundown.component';
import { NoobTutorialComponent } from './tutorial/noob-tutorial/noob-tutorial.component';
import { HistoryComponent } from './tutorial/history/history.component';
import { AudioBasicsComponent } from './tutorial/audio-basics/audio-basics.component';
import { FiltersTutorialComponent } from './tutorial/filters-tutorial/filters-tutorial.component';
import { LfoTutorialComponent } from './tutorial/lfo-tutorial/lfo-tutorial.component';
import { EnvelopeTutorialComponent } from './tutorial/envelope-tutorial/envelope-tutorial.component';
import { FxComponent } from './tutorial/fx/fx.component';
import { SequencingComponent } from './tutorial/sequencing/sequencing.component';
import { AdvancedComponent } from './tutorial/advanced/advanced.component';

const routes: Routes = [
  {path: '', component: AppWrapperComponent},
  {path: 'tutorial', children: [
    {path: '', component: TutorialLandingComponent},
    {path: 'basic', component: BasicRundownComponent},
    {path: 'noob', children: [
      {path: '', component: NoobTutorialComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'audio-basics', component: AudioBasicsComponent},
      {path: 'filters', component: FiltersTutorialComponent},
      {path: 'lfo', component: LfoTutorialComponent},
      {path: 'envelope', component: EnvelopeTutorialComponent},
      {path: 'fx', component: FxComponent},
      {path: 'sequencing', component: SequencingComponent},
      {path: 'advanced', component: AdvancedComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
