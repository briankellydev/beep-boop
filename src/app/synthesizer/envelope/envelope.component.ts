import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Envelope } from '../../interfaces';

@Component({
  selector: 'app-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent implements OnInit {

  @Output() envChanged = new EventEmitter<Envelope>();

  envConfig: Envelope = {
    attack: 1,
    decay: 1,
    sustain: 30,
    release: 1
  };

  constructor() { }

  ngOnInit() {
  }

  changes() {
    this.envChanged.emit(this.envConfig);
  }

}
