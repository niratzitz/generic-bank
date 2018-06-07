import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ChildActivationEnd, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      console.log(event);
      if(event instanceof ChildActivationEnd) {
        if(event.snapshot.firstChild['data']['title']) {
          this.title = event.snapshot.firstChild['data']['title'];
        }
      }

    })
  }
}
