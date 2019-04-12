import { Component, OnInit, OnDestroy } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';
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

  private destroy$ = new Subject<any>();

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    for (let i = 0; i < this.synthService.numberOfMeasures; i++) {
      this.measures.push({});
    }
    this.synthService.tracks.pipe(takeUntil(this.destroy$)).subscribe((tracks: TimelineTrack[]) => {
      this.timelineTracks = tracks;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  setPattern(track: TimelineTrack, measure: number) {
    console.log(track);
    console.log(measure);
  }

}
