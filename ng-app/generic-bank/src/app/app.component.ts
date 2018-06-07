import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ChildActivationEnd, NavigationEnd, Router} from "@angular/router";
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

const ANIMATION_DURATION = '0.3s';
const ANIMATION_TYPE = 'ease-in-out';

const opacityTransition = trigger('opacityTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ opacity: '0'})
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ opacity: '0' }),
        animate(`${ANIMATION_DURATION} ${ANIMATION_TYPE}`, style({ opacity: '1'}))
      ], { optional: true }),
      query(':leave', [
        style({ opacity: '1' }),
        animate(`${ANIMATION_DURATION} ${ANIMATION_TYPE}`, style({ opacity: '0' }))
      ], { optional: true }),
    ])
  ])
]);

const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate(`${ANIMATION_DURATION} ${ANIMATION_TYPE}`, style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate(`${ANIMATION_DURATION} ${ANIMATION_TYPE}`, style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ])
  ])
]);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [ routerTransition, opacityTransition ]
})
export class AppComponent implements OnInit{
  title = 'app';
  showBack = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      console.log(event);
      if(event instanceof ChildActivationEnd) {
        // if(event.snapshot.firstChild['data']['title']) {
        const data = event.snapshot.firstChild['data'];
          this.title = data['title'];
          this.showBack = data['showBack'];
        // }
      }
    });
  }
}
