import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SynthService } from 'src/app/shared/services/synth.service';
import { takeUntil } from 'rxjs/operators';
import { TimelineTrack, Instrument, BeepBlaster } from 'src/app/interfaces';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {

  timelineTracks: TimelineTrack[] = [];
  measures: any[] = [];
  dropdownShowing: string = null;
  currentMeasure = 0;
  instruments: Instrument<BeepBlaster>[];

  private destroy$ = new Subject<any>();

  constructor(
    private synthService: SynthService,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit() {
    for (let i = 0; i < this.synthService.numberOfMeasures; i++) {
      this.measures.push({});
    }
    this.synthService.instruments.pipe(takeUntil(this.destroy$)).subscribe((instruments: Instrument<BeepBlaster>[]) => {
      const tracks: TimelineTrack[] = [];
      this.instruments = JSON.parse(JSON.stringify(instruments));
      instruments.forEach((instrument) => {
        tracks.push(JSON.parse(JSON.stringify(instrument.instrument.track)));
      });
      this.timelineTracks = tracks;
    });
    this.synthService.tick.pipe(takeUntil(this.destroy$)).subscribe((measure: number) => {
      this.currentMeasure = measure;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  toggleSolo(index: number) {
    this.timelineTracks[index].solo = !this.timelineTracks[index].solo;
    this.instruments[index].instrument.track.solo = !this.instruments[index].instrument.track.solo;
    this.meterChanged();
  }

  toggleMute(index: number) {
    this.timelineTracks[index].mute = !this.timelineTracks[index].mute;
    this.instruments[index].instrument.track.mute = !this.instruments[index].instrument.track.mute;
    this.meterChanged();
  }

  toggleCollapsed(index: number) {
    this.timelineTracks[index].collapsed = !this.timelineTracks[index].collapsed;
    this.instruments[index].instrument.track.collapsed = !this.instruments[index].instrument.track.collapsed;
    this.meterChanged();
  }

  // TODO this isn't very performant for meter showing, explore what's up
  /*getMeterWidth(level: number) {
    // Gotta make it logarithmic as dB is log
    if (level === -Infinity) {
      return '0px';
    }
    const pct = (level + 50) / 56;
    const width = 150 * pct;
    const scale = Math.log(150) / 100;
    return `${Math.exp(scale * Math.round(width))}px`;
  }*/

  meterChanged() {
    this.synthService.instruments.next(this.instruments);
  }


  getPatternWidth(patternNumber: number, track: TimelineTrack) {
    return track.patternLengths[patternNumber - 1] ? `${track.patternLengths[patternNumber - 1] * 52}px` : '52px';
  }

  toggleDropdown(dropdown: string) {
    this.dropdownShowing = dropdown === this.dropdownShowing ? null : dropdown;
  }

  selectPattern(track: TimelineTrack, idx: number, pattern: number) {
    const trackIdx = this.timelineTracks.findIndex((globalTrack: TimelineTrack) => {
      return track.instanceNumber === globalTrack.instanceNumber;
    });
   this.timelineTracks[trackIdx].patternPerMeasure[idx] = pattern;
   this.instruments[trackIdx].instrument.track.patternPerMeasure[idx] = pattern;
   if (track.patternLengths[pattern - 1] > 1) {
     for (let i = 1; i < track.patternLengths[pattern - 1]; i++) {
      this.timelineTracks[trackIdx].patternPerMeasure[i + idx] = -1;
      this.instruments[trackIdx].instrument.track.patternPerMeasure[i + idx] = -1;
    }
   }
   this.synthService.instruments.next(this.instruments);
   this.toggleDropdown(this.dropdownShowing);
  }

  addMeasure() {
    this.synthService.numberOfMeasures++;
    this.measures.push({});
    this.timelineTracks.forEach((track, index) => {
      track.patternPerMeasure.push(null);
      this.instruments[index].instrument.track.patternPerMeasure.push(null);
    });
    this.synthService.instruments.next(this.instruments);
  }

  deleteMeasure() {
    this.synthService.numberOfMeasures--;
    this.measures.pop();
    this.timelineTracks.forEach((track, index) => {
      track.patternPerMeasure.pop();
      this.instruments[index].instrument.track.patternPerMeasure.pop();
    });
    this.synthService.instruments.next(this.instruments);
  }

}
