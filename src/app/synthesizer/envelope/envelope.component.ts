import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Envelope } from '../../interfaces';

@Component({
  selector: 'app-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent implements OnInit {

  @Input() envConfig: Envelope;
  @Output() envChanged = new EventEmitter<Envelope>();

  constructor() { }

  ngOnInit() {
    Object.keys(this.envConfig).forEach((key: string) => {
      if (key === 'sustain') {
        this.envConfig[key] *= 100;
      } else {
        this.envConfig[key] *= 1000;
      }
      
    });
  }

  changes() {
    this.envChanged.emit(this.envConfig);
  }

}
