import { Component, OnInit, Input, ComponentRef } from '@angular/core';
import { SynthService } from 'src/app/shared/services/synth.service';
import { BoomBoom } from 'src/app/interfaces';

@Component({
  selector: 'app-boom-boom',
  templateUrl: './boom-boom.component.html',
  styleUrls: ['./boom-boom.component.scss']
})
export class BoomBoomComponent implements OnInit {

  collapsed = true;
  playing = false;
  showSequencer = false;
  instanceNumber: number;
  deviceNumberIndex: number;
  config: BoomBoom;

  constructor(public synthService: SynthService) { }

  ngOnInit() {
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  destroy() {
    this.synthService.instanceToDelete.next(this.instanceNumber);
  }

  enableMidi() {
    this.synthService.instanceMidiActivated = this.synthService.instanceMidiActivated === this.instanceNumber ? null : this.instanceNumber;
  }

}
