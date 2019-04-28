import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SynthService } from 'src/app/shared/services/synth.service';
import { takeUntil } from 'rxjs/operators';
import { TimelineTrack } from 'src/app/interfaces';
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

  private destroy$ = new Subject<any>();

  constructor(
    private synthService: SynthService,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit() {
    for (let i = 0; i < this.synthService.numberOfMeasures; i++) {
      this.measures.push({});
    }
    this.synthService.tracks.pipe(takeUntil(this.destroy$)).subscribe((tracks: TimelineTrack[]) => {
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
    this.meterChanged();
  }

  toggleMute(index: number) {
    this.timelineTracks[index].mute = !this.timelineTracks[index].mute;
    this.meterChanged();
  }

  toggleCollapsed(index: number) {
    this.timelineTracks[index].collapsed = !this.timelineTracks[index].collapsed;
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
    this.synthService.tracks.next(this.timelineTracks);
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
   if (track.patternLengths[pattern - 1] > 1) {
     for (let i = 1; i < track.patternLengths[pattern - 1]; i++) {
     this.timelineTracks[trackIdx].patternPerMeasure[i + idx] = -1;
    }
   }

   this.synthService.tracks.next(this.timelineTracks);
  }

  addMeasure() {
    this.synthService.numberOfMeasures++;
    this.measures.push({});
    this.timelineTracks.forEach((track) => {
      track.patternPerMeasure.push(null);
    });
    this.synthService.tracks.next(this.timelineTracks);
  }

  deleteMeasure() {
    this.synthService.numberOfMeasures--;
    this.measures.pop();
    this.timelineTracks.forEach((track) => {
      track.patternPerMeasure.pop();
    });
    this.synthService.tracks.next(this.timelineTracks);
  }

}
