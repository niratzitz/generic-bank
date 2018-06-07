import {AfterViewChecked, AfterViewInit, Component, ComponentRef, ElementRef, OnInit, ViewRef} from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements AfterViewChecked {

  constructor() { }

  ngAfterViewChecked() {
    // console.log(this.elem.);
  }

}
