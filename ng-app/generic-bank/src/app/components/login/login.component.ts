import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginAccount(first, last, $event) {
    $event.preventDefault();

    if(first === 'admin' && last === 'admin') {
      this.router.navigate(['/admin']);
    }
  }

}
