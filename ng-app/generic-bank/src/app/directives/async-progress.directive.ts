import {Directive, EventEmitter, HostBinding, Input, OnDestroy, Output} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs/internal/Subscription";

@Directive({
  selector: '[asyncProgress]'
})
export class AsyncProgressDirective implements OnDestroy{
  private _subscription: Subscription;

  @Output() data = new EventEmitter();
  @Output() error = new EventEmitter();
  @Output() complete = new EventEmitter();

  @Input('asyncProgress') set obs$(obs: Observable<any>) {
    if(!isNullOrUndefined(obs)) {
      this.emitChanges(null, null, false);

      this._subscription = obs.subscribe(
        (data) => {
          console.log(data);
          this.emitChanges(data, null, false);
        },
        err => {
          console.log(err);
          this.emitChanges(null, err, true);
        },
        () => {
          console.log('completed');
          this.emitChanges(null, null, true)
        }
      );
    }
  };

  constructor() { }

  private emitChanges(data, err, complete) {
    if(!isNullOrUndefined(data)) {
      this.data.emit(data);
    }

    // if(!isNullOrUndefined(err)) {
      this.error.emit(err);
    // }

    // if(!isNullOrUndefined(complete)) {
      this.complete.emit(complete);
    // }
  }

  ngOnDestroy() {
    if(!isNullOrUndefined(this._subscription)) {
      this._subscription.unsubscribe();
    }
  }

}
