import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'beep-boop';
  sequence: string[] = [];

  constructor() {}

  ngOnInit() {
    
  }

  changeSequence(sequence: string[]) {
    this.sequence = sequence;
  }
}
