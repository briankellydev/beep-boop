import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthService } from 'src/app/shared/services/synth.service';
import { Pattern, BeepBlaster, Instrument } from 'src/app/interfaces';
import { takeUntil } from 'rxjs/operators';

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
  private destroy$ = new Subject<any>();
  private instruments: Instrument<BeepBlaster>[];

  constructor(public synthService: SynthService) { }

  ngOnInit() {
    this.synthService.instruments.pipe(takeUntil(this.destroy$)).subscribe((instruments: Instrument<BeepBlaster>[]) => {
      this.instruments = JSON.parse(JSON.stringify(instruments));
      this.deviceNumberIndex = instruments.findIndex((instrument) => {
        return instrument.instrument.track.instanceNumber === this.instanceNumber;
      });
      this.patterns = this.instruments[this.deviceNumberIndex].instrument.patterns;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
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
