import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MENU_SCREENS } from 'src/app/constants';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit, OnDestroy {

  @Input() itemSelected: string;
  @Output() showItem = new EventEmitter<string>();
  showTimeline = false;
  playing = false;
  tempo = 120;
  menuItems = MENU_SCREENS;
  timeSigNumerator = 4;
  timeSigDenominator = 4;

  private destroy$ = new Subject<any>();

  constructor(
    private synthService: SynthService,
    private cdr: ChangeDetectorRef,
    ) { }

  ngOnInit() {
    this.synthService.playing.pipe(takeUntil(this.destroy$)).subscribe((isPlaying: boolean) => {
      this.togglePlay(isPlaying);
      this.cdr.detectChanges();
    });
    this.setTempo();
    Tone.Transport.scheduleRepeat(() => {
      const timeArray = Tone.Transport.position.split(':');
      if (parseInt(timeArray[0]) === this.synthService.numberOfMeasures) {
        this.synthService.playing.next(false);
        this.synthService.recorder.finishRecording();
      }
      this.synthService.tick.next(parseInt(timeArray[0]));
    }, '1m', 0);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  togglePlay(playing: boolean) {
    if (playing !== this.playing) {
      this.playing = playing;
      if (this.playing) {
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
      }
      this.synthService.playing.next(this.playing);
    }
  }

  setTempo() {
    Tone.Transport.bpm.value = this.tempo;
  }

  changeItem(item: string) {
    this.showItem.emit(item);
  }

  setTimeSig() {
    Tone.Transport.timeSignature = [this.timeSigNumerator, this.timeSigDenominator];
    const stepsPerMeasure = this.synthService.calculateNumberOfStepsPerMeasure(this.timeSigNumerator, this.timeSigDenominator);
    this.synthService.numberOfStepsPerMeasure.next(stepsPerMeasure);
  }

}
