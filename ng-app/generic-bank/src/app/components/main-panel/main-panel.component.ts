import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.less']
})
export class MainPanelComponent implements OnInit {

  @Input() title = 'This is a title';

  constructor() { }

  ngOnInit() {
  }

}
