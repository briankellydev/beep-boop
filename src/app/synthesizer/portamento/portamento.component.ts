import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-portamento',
  templateUrl: './portamento.component.html',
  styleUrls: ['./portamento.component.scss']
})
export class PortamentoComponent implements OnInit {
  @Output() portChanged = new EventEmitter<number>();
  port = 0;

  constructor() { }

  ngOnInit() {
    $(`.port-slider`).roundSlider({
      radius: 40,
      circleShape: `default`,
      sliderType: `min-range`,
      showTooltip: true,
      value: this.port,
      min: 0,
      max: 100
    });
  }

  changes() {
    this.port = parseInt($(`.volume .rs-tooltip`).text());
    this.portChanged.emit(this.port / 5);
  }

}
