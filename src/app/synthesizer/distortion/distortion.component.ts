import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-distortion',
  templateUrl: './distortion.component.html',
  styleUrls: ['./distortion.component.scss']
})
export class DistortionComponent implements OnInit, AfterViewInit {

  @Output() distChanged = new EventEmitter<number>();
  @Output() toggleChanged = new EventEmitter<boolean>();
  
  distortion = 0;
  enabled = false;
  customGeneratedId = this.synthService.generateRandomNumber();

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    $(`#${this.customGeneratedId} .distortion`).roundSlider({
      radius: 40,
      circleShape: `default`,
      sliderType: `min-range`,
      showTooltip: true,
      value: this.distortion,
      min: 0,
      max: 100
    });
  }

  changes() {
    this.distortion = parseInt($(`#${this.customGeneratedId} .rs-tooltip`).eq(0).text());
    this.distChanged.emit(parseInt($(`#${this.customGeneratedId} .rs-tooltip`).eq(0).text()) / 100);
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
