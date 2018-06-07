import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.less']
})
export class MainPanelComponent implements OnInit {

  @Input() title = 'This is a title';
  @Input() showBack = false;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
