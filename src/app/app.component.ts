import { Component, OnInit, OnDestroy } from '@angular/core';
import { MENU_SCREENS } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'beep-boop';
  itemToShow: string;
  menuScreens = MENU_SCREENS;

  constructor() {}

  ngOnInit() {
    this.itemToShow = this.menuScreens.RACK;
  }

  showItem(item: string) {
    this.itemToShow = item;
  }
}
