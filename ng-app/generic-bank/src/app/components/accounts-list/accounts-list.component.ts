import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api/api.service";
import {Observable} from "rxjs/internal/Observable";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.less']
})
export class AccountsListComponent implements OnInit {
  private accountRegex = /(\S+):(\S+):(\d+)/;
  public list$: Observable<any>;

  public list: Array<Account> = [];
  public error: boolean = false;
  public complete: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.list$ = this.api.getAccountsList();
  }

  onSuccess(data) {
    console.log(data);
    data.accounts.forEach(account => {
      const res = this.accountRegex.exec(account);

      if(!isNullOrUndefined(res)) {
        this.list.push({
          first: res[1],
          last: res[2],
          id: res[3]
        })
      }
    });
  }

}

export interface Account {
  first: string,
  last: string,
  id: string
}
