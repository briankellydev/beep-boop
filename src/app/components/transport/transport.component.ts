import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
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

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    this.synthService.playing.pipe(takeUntil(this.destroy$)).subscribe((isPlaying: boolean) => {
      this.playing = isPlaying;
    });
    this.setTempo();
    Tone.Transport.scheduleRepeat(() => {
      const timeArray = Tone.Transport.position.split(':');
      this.synthService.tick.next(parseInt(timeArray[0]));
    }, '8n', 0);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  togglePlay() {
    this.playing = !this.playing;
    this.synthService.playing.next(this.playing);
    Tone.Transport.toggle();
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
