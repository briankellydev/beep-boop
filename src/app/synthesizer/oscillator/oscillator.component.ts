import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit {

  @Input() oscNumber: string;
  @Output() oscChanged = new EventEmitter<string>();
  @Output() oscToggled = new EventEmitter<boolean>();

  oscillatorSelected = 'sine';
  enabled = this.oscNumber === '1' ? true : false;

  constructor() { }

  ngOnInit() {
  }

  selectOsc(osc: string) {
    this.oscillatorSelected = osc;
    this.oscChanged.emit(osc);
  }

  toggleOsc() {
    this.enabled = !this.enabled;
    this.oscToggled.emit(this.enabled);
  }

}
