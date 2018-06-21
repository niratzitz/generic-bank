import {Component, ElementRef, HostBinding, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, ChildActivationEnd, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {routerTransition, navigationOpacity} from "./animations/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [ routerTransition, navigationOpacity]
})
export class AppComponent implements OnInit{
  private height$ = new BehaviorSubject(0);
  public heightObs = this.height$.asObservable();

  @ViewChild('main') innerView: ElementRef;

  title = 'app';
  showBack = false;
  showTime = false;
  backString = 'Back';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof ChildActivationEnd) {
        const data = event.snapshot.firstChild['data'];
        this.title = data['title'];
        this.showBack = data['showBack'];
        this.showTime = data['showTime'] || false;
        this.backString = data['backString'] || 'Back';
      }
    });

    this.heightObs.subscribe((height) => {
      this.innerView.nativeElement.height = height;
      this.renderer.setStyle(this.innerView.nativeElement, 'height', `${height}px`);
    });
  }

  applyHeight(height) {
    this.height$.next(height);
  }
}
