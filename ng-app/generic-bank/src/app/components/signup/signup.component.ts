import {AfterViewChecked, AfterViewInit, Component, ComponentRef, ElementRef, OnInit, ViewRef} from '@angular/core';
import {ApiService} from "../../services/api/api.service";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent {
  public model = {
    first: '',
    last: ''
  };

  public respond$: Observable<any>;

  public complete = null;
  public error = null;
  public data = null;

  constructor(private api: ApiService) { }

  createAccount(first: string, last: string, $event) {
    $event.preventDefault();

    this.respond$ = this.api.createAccount(first, last);
  }

}
