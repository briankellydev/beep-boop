import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnChanges } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() vol: number;
  @Output() volChanged = new EventEmitter<number>();
  customGeneratedId = this.synthService.generateRandomNumber();

  constructor(private synthService: SynthService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (parseInt($(`#${this.customGeneratedId} .rs-tooltip`).text()) !== this.vol) {
      $(`#${this.customGeneratedId} .rs-tooltip`).text(this.vol);
    }
  }

  ngAfterViewInit() {
    $(`#${this.customGeneratedId} .volume-slider`).roundSlider({
      radius: 40,
      circleShape: 'default',
      sliderType: 'min-range',
      showTooltip: true,
      value: this.vol,
      min: -50,
      max: 6
    });
  }

  changes() {
    this.vol = parseInt($(`#${this.customGeneratedId} .rs-tooltip`).text());
    this.volChanged.emit(this.vol);
  }

}
