import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit {

  @Output() oscChanged = new EventEmitter<string>();

  oscillatorSelected = 'sine';

  constructor() { }

  ngOnInit() {
  }

  selectOsc(osc: string) {
    this.oscillatorSelected = osc;
    this.oscChanged.emit(osc);
  }

}
