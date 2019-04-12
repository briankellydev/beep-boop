import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SynthService } from 'src/app/shared/synth.service';
import { NullSequence } from 'src/app/constants';
import { Pattern } from 'src/app/interfaces';

@Component({
  selector: 'app-beep-blaster',
  templateUrl: './beep-blaster.component.html',
  styleUrls: ['./beep-blaster.component.scss']
})
export class BeepBlasterComponent implements OnInit, OnDestroy {

  patterns: Pattern[] = [];
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

  changePatterns(patterns: Pattern[]) {
    this.patterns = patterns;
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
