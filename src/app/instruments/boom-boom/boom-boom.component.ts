import { Component, OnInit, Input, ComponentRef } from '@angular/core';
import { SynthService } from 'src/app/shared/synth.service';

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

  constructor(private synthService: SynthService) { }

  ngOnInit() {
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  destroy() {
    this.synthService.instanceToDelete.next(this.instanceNumber);
  }

}
