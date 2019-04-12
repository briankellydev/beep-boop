import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit, OnDestroy {

  @Output() timelineToggled = new EventEmitter<boolean>();
  showTimeline = false;
  playing = false;
  tempo = 120;

  private destroy$ = new Subject<any>();

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    this.synthService.playing.pipe(takeUntil(this.destroy$)).subscribe((isPlaying: boolean) => {
      this.playing = isPlaying;
    });
    this.setTempo();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  toggleTimeline() {
    this.showTimeline = !this.showTimeline;
    this.timelineToggled.emit(this.showTimeline);
  }

  togglePlay() {
    this.playing = !this.playing;
    this.synthService.playing.next(this.playing);
    // Tone.Transport.loop = true;
    // Tone.Transport.loopEnd = '1m';
    Tone.Transport.toggle();
  }

  setTempo() {
    Tone.Transport.bpm.value = this.tempo;
  }

}
