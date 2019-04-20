import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reverb',
  templateUrl: './reverb.component.html',
  styleUrls: ['./reverb.component.scss']
})
export class ReverbComponent implements OnInit {

  @Output() verbChanged = new EventEmitter<number>();
  @Output() toggleChanged = new EventEmitter<boolean>();
  decay = 0;
  enabled = false;

  constructor() { }

  ngOnInit() {
    
  }

  changeDecay(decay: number) {
    this.decay = decay
    this.verbChanged.emit(decay);
  }

  toggle() {
    this.enabled = !this.enabled;
    this.toggleChanged.emit(this.enabled);
  }

}
