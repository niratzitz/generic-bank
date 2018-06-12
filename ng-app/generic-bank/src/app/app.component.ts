import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, ChildActivationEnd, NavigationEnd, Router} from "@angular/router";
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';
import {DomSanitizer} from "@angular/platform-browser";
import {SubjectSubscriber} from "rxjs/internal/Subject";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

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
    /* 1 */ query(':enter, :leave', style({ position: 'absolute'})
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
  private height$ = new BehaviorSubject(0);
  public heightObs = this.height$.asObservable();
  public height = 0;

  @ViewChild('main') innerView: ElementRef;

  title = 'app';
  showBack = false;
  showTime = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public safe: DomSanitizer,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      // console.log(event);
      if(event instanceof ChildActivationEnd) {
        const data = event.snapshot.firstChild['data'];
        this.title = data['title'];
        this.showBack = data['showBack'];
        this.showTime = data['showTime'] || false;
      }
    });

    this.heightObs.subscribe((height) => {
      this.height = height;
      this.innerView.nativeElement.height = height;
      this.renderer.setStyle(this.innerView.nativeElement, 'height', `${height}px`);
      // console.log(height);
    });
  }

  applyHeight(height) {
    this.height$.next(height);
  }
}
