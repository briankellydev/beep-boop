import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { SynthService } from 'src/app/shared/services/synth.service';

@Component({
  selector: 'app-distortion',
  templateUrl: './distortion.component.html',
  styleUrls: ['./distortion.component.scss']
})
export class DistortionComponent implements OnInit {

  @Input() distortion: number;
  @Output() distChanged = new EventEmitter<number>();
  @Output() toggleChanged = new EventEmitter<boolean>();

  enabled = false;

  constructor() { }

  ngOnInit() {
    
  }

  changeDist(dist: number) {
    this.distortion = dist;
    this.distChanged.emit(dist / 100);
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
