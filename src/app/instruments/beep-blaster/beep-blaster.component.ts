import { Component, OnInit, AfterViewInit, ComponentRef, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SynthService } from 'src/app/shared/synth.service';
import { NullSequence } from 'src/app/constants';

@Component({
  selector: 'app-beep-blaster',
  templateUrl: './beep-blaster.component.html',
  styleUrls: ['./beep-blaster.component.scss']
})
export class BeepBlasterComponent implements OnInit {

  sequence: string[] = JSON.parse(JSON.stringify(NullSequence));
  showSequencer = false;
  playing = false;
  playingSubject$ = new BehaviorSubject<boolean>(false);
  collapsed = true;
  instanceNumber: number;

  constructor(private synthService: SynthService) { }

  ngOnInit() {
  }

  changeSequence(sequence: string[]) {
    this.sequence = sequence;
  }

  toggleSequencer() {
    this.showSequencer = !this.showSequencer;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  play() {
    this.playing = !this.playing;
    this.playingSubject$.next(this.playing);
  }

  destroy() {
    this.synthService.instanceToDelete.next(this.instanceNumber);
  }

}
