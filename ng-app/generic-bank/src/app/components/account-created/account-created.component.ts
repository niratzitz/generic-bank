import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account-created',
  templateUrl: './account-created.component.html',
  styleUrls: ['./account-created.component.less']
})
export class AccountCreatedComponent implements OnInit, OnDestroy {
  public id: string;
  private sub$;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub$ = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

}
