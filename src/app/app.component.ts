import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './interfaces/Account.interfaces';
import { LOADING_SERVICE_INJECTOR } from './services/http-request.interceptor';
import { ILoadingService } from './interfaces/loading.interface';
import { Subscription, debounceTime, delay, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Fake-Twitter';
  isLoading = false;
  private subscriptions:Subscription[] = [];

  constructor(private accountService: AccountService,
    @Inject(LOADING_SERVICE_INJECTOR)
    private loadingService: ILoadingService,) {
      this.listenToLoading();
  }

  ngOnDestroy(): void {
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  ngOnInit() {
    this.setCurrentUser();
  }

  private setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  listenToLoading(): void {
    this.subscriptions.push(this.loadingService.loadingSub

      .pipe(
        delay(0),
        debounceTime(100),
        distinctUntilChanged() 
      )

      .subscribe((loading) => {
        this.isLoading = loading;
      }))
  }
}
