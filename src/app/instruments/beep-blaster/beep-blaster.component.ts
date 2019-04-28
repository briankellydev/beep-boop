import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthService } from 'src/app/shared/components/services/synth.service';
import { Pattern, BeepBlaster } from 'src/app/interfaces';

@Component({
  selector: 'app-beep-blaster',
  templateUrl: './beep-blaster.component.html',
  styleUrls: ['./beep-blaster.component.scss']
})
export class BeepBlasterComponent implements OnInit, OnDestroy {

  patterns: Pattern[] = [];
  showSequencer = false;
  collapsed = true;
  instanceNumber: number;
  deviceNumberIndex: number;
  config: BeepBlaster;
  destroy$ = new Subject<any>();

  constructor(public synthService: SynthService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  changePatterns(patterns: Pattern[]) {
    this.patterns = patterns;
  }

  toggleSequencer() {
    this.showSequencer = !this.showSequencer;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  destroy() {
    this.synthService.instanceToDelete.next(this.instanceNumber);
  }

  enableMidi() {
    this.synthService.instanceMidiActivated = this.synthService.instanceMidiActivated === this.instanceNumber ? null : this.instanceNumber;
  }

}
