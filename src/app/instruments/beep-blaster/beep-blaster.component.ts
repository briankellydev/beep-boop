import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthService } from 'src/app/shared/synth.service';
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
  deviceNumberIndex: number;
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
