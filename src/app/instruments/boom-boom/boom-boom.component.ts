import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boom-boom',
  templateUrl: './boom-boom.component.html',
  styleUrls: ['./boom-boom.component.scss']
})
export class BoomBoomComponent implements OnInit {

  collapsed = false;
  playing = false;
  showSequencer = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  toggleSequencer() {
    this.showSequencer = !this.showSequencer;
  }

  changeSequence() {

  }

  play() {
    
  }

}
