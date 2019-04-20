import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss']
})
export class KnobComponent implements OnInit {

  @Input() diameter = 75;
  @Input() min = 0;
  @Input() max = 100;
  @Input() primaryColor = '#131313';
  @Input() secondaryColor: '#CCCCCC';
  @Input() textColor: '#EEEEEE';
  @Output() valChanged = new EventEmitter<number>();

  dragging = false;
  initialY: number;
  rotation = 0;
  currentRotation = 0;

  @HostListener('document:mousemove', ['$event']) onMouseMove(e) {
    if (this.dragging) {
      this.rotation = ((e.y - this.initialY) * -3) + this.currentRotation;
      if (this.rotation > 250) {
        this.rotation = 250;
      }
      if (this.rotation < 0) {
        this.rotation = 0;
      }
      this.calculateValue();
    }
  }
  @HostListener('document:mouseup', ['$event']) mouseUp(e) {
    this.setDragging(e, false);
  }

  constructor() { }

  ngOnInit() {
  }

  setDragging(event: any, isDragging: boolean) {
    this.currentRotation = this.rotation;
    this.dragging = isDragging;
    if (isDragging) {
      this.initialY = event.y;
    }
  }

  calculateValue() {
    // Map min/max exponentially between 0-250 (rotation)
    let newVal = 0;
    const maxLog = Math.log(this.max);
    const scaleLog = maxLog / (250);
    newVal = Math.exp(this.rotation * scaleLog);
    this.valChanged.emit(newVal);
  }

  getDisplayMax() {
    if (this.max > 1000) {
      return `${this.max / 1000}k`;
    } else {
      return this.max;
    }
  }

}
