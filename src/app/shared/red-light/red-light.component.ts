import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-red-light',
  templateUrl: './red-light.component.html',
  styleUrls: ['./red-light.component.scss']
})
export class RedLightComponent implements OnInit {
  @Input() active: boolean;

  constructor() { }

  ngOnInit() {
  }

}
