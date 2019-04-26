import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements OnInit {

  @Input() delayConfig: any;
  @Output() delayChanged = new EventEmitter<any>();
  @Output() toggleChanged = new EventEmitter<boolean>();

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
