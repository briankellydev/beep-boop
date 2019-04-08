import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-beep-blaster',
  templateUrl: './beep-blaster.component.html',
  styleUrls: ['./beep-blaster.component.scss']
})
export class BeepBlasterComponent implements OnInit {

  sequence: string[];
  showSequencer = false;
  playing = false;
  playingSubject$ = new BehaviorSubject<boolean>(false);
  collapsed = true;

  constructor() { }

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

}
