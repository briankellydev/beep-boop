import { Component, OnInit, OnDestroy } from '@angular/core';
import { SynthService } from 'src/app/shared/services/synth.service';
import { BoomBoom, Instrument } from 'src/app/interfaces';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-boom-boom',
  templateUrl: './boom-boom.component.html',
  styleUrls: ['./boom-boom.component.scss']
})
export class BoomBoomComponent implements OnInit, OnDestroy {

  collapsed = true;
  playing = false;
  showSequencer = false;
  instanceNumber: number;
  deviceNumberIndex: number;
  config: BoomBoom;

  private destroy$ = new Subject<any>();

  constructor(public synthService: SynthService) { }

  ngOnInit() {
    this.synthService.instruments.pipe(takeUntil(this.destroy$)).subscribe((instruments: Instrument<BoomBoom>[]) => {
      this.deviceNumberIndex = instruments.findIndex((instrument) => {
        return instrument.instrument.track.instanceNumber === this.instanceNumber;
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
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
