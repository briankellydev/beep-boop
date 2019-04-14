import { Component, OnInit, OnDestroy } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';
import { TimelineTrack } from 'src/app/interfaces';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss']
})
export class MixerComponent implements OnInit, OnDestroy {

  tracks: TimelineTrack[];

  private destroy$ = new Subject<any>();

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    this.synthService.tracks.pipe(takeUntil(this.destroy$)).subscribe((tracks: TimelineTrack[]) => {
      this.tracks = tracks;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  volChanged() {
    this.synthService.tracks.next(this.tracks);
  }

}
