import {Component, OnInit} from '@angular/core';
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

    console.log(this.model, first, last);

    if(this.model.first === 'admin' && this.model.last === 'admin') {
      this.router.navigate(['/admin']);
    }
  }

}
