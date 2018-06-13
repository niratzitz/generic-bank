import {Component, Input} from '@angular/core';

@Component({
  selector: 'progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.less']
})
export class ProgressCardComponent {
  @Input()
  public text: string = '';

  @Input()
  public textColor: Color  = Color.LIGHT;

  @Input()
  public bgColor: Color = Color.INFO;

  @Input()
  public showIcon: boolean = true;

  @Input()
  public icon: string = '';

  // public colors = Color;

  constructor() { }
}

export enum Color {
  ERROR='danger',
  WARNING='warning',
  INFO='info',
  SUCCESS='success',
  TRANSPARENT='transparent',
  LIGHT='light',
  DARK='dark'
}
