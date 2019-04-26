import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { Filter } from '../../interfaces';
import { SynthService } from 'src/app/shared/synth.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filterConfig: Filter;
  @Output() filterChanged = new EventEmitter<Filter>();

  typeSelected = 'lowpass';
  constructor() { }

  ngOnInit() {
    
  }

  changeFreq(freq: number) {
    this.filterConfig.frequency = freq;
    this.filterChanged.emit(this.filterConfig);
  }

  changeQ(q: number) {
    this.filterConfig.Q = q;
    this.filterChanged.emit(this.filterConfig);
  }


  selectType(type: string) {
    this.typeSelected = type;
    this.filterConfig.type = this.typeSelected;
    this.filterChanged.emit(this.filterConfig);
  }
}
