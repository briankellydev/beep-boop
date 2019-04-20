import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements OnInit {


  @Output() delayChanged = new EventEmitter<any>();
  @Output() toggleChanged = new EventEmitter<boolean>();
  delayConfig = {
    delayTime: 0,
    feedback: 0,
  };
  enabled = false;

  constructor() { }

  ngOnInit() {
  }

  changeTime(time: number) {
    this.delayConfig.delayTime = time;
    this.delayChanged.emit(this.delayConfig);
  }

  changeFeedback(feedback: number) {
    this.delayConfig.feedback = feedback;
    this.delayChanged.emit(this.delayConfig);
  }


  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
