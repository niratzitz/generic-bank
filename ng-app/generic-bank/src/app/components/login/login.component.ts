import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public model = {
    first: '',
    last: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
