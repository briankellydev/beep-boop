import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-portamento',
  templateUrl: './portamento.component.html',
  styleUrls: ['./portamento.component.scss']
})
export class PortamentoComponent implements OnInit {
  @Output() portChanged = new EventEmitter<number>();
  port = 0;

  constructor() { }

  ngOnInit() {

  }

}
