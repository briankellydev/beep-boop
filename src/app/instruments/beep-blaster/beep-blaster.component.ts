import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SynthService } from 'src/app/shared/synth.service';
import { NullSequence } from 'src/app/constants';

@Component({
  selector: 'app-beep-blaster',
  templateUrl: './beep-blaster.component.html',
  styleUrls: ['./beep-blaster.component.scss']
})
export class BeepBlasterComponent implements OnInit, OnDestroy {

  sequence: string[] = JSON.parse(JSON.stringify(NullSequence));
  showSequencer = false;
  collapsed = true;
  instanceNumber: number;
  destroy$ = new Subject<any>();

  constructor(private synthService: SynthService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  changeSequence(sequence: string[]) {
    this.sequence = sequence;
  }

  toggleSequencer() {
    this.showSequencer = !this.showSequencer;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  destroy() {
    this.synthService.instanceToDelete.next(this.instanceNumber);
  }

}
