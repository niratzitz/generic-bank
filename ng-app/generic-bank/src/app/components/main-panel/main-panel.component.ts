import {AfterContentChecked, AfterContentInit, Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ApiService, timeResponse} from "../../services/api/api.service";
import {Observable} from "rxjs/internal/Observable";
import animations from "../../animations/animations";

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.less'],
  animations: [animations.opacityTransition, animations.expandTransition]
})
export class MainPanelComponent {
  private _showTime: boolean = false;

  public times$: Observable<any>;
  public times: Array<timeResponse>;
  public timesError: boolean = false;
  public timesLoading: boolean = false;

  @Input() title = 'This is a title';
  @Input() showBack = false;
  @Input() set showTime(value: boolean) {
    this._showTime = value;

    if(value) {
      this.times$ = this.api.getTime('Asia/Jerusalem', 'Asia/Tokyo', 'Europe/London');
    }
  };

  get showTime(): boolean {
    return this._showTime;
  }

  constructor(private api: ApiService, private location: Location) { }

  goBack() {
    this.location.back();
  }
}
