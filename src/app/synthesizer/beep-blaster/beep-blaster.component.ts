import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beep-blaster',
  templateUrl: './beep-blaster.component.html',
  styleUrls: ['./beep-blaster.component.scss']
})
export class BeepBlasterComponent implements OnInit {

  sequence: string[] = [];
  showSequencer = false;

  constructor() { }

  ngOnInit() {
  }

  changeSequence(sequence: string[]) {
    this.sequence = sequence;
  }

  toggleSequencer() {
    this.showSequencer = !this.showSequencer;
  }

}
