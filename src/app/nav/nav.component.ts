import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Subject, Subscription, debounceTime, delay, distinctUntilChanged, filter, tap } from 'rxjs';
import { User } from '../interfaces/Account.interfaces';
import { Router } from '@angular/router';
import { TweetService } from '../services/tweet.service';
import { TweetUser } from '../interfaces/Tweet.interfaces';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy, OnInit{

  @Input() title!: string;
  isLoading = false;
  initialValue: string = '';
  debounceTime = 300;

  inputValue = new Subject<string>();
  selectedUser: TweetUser = {} as TweetUser;
  trigger = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    delay(500),
    filter((query: string) =>  query?.length > 2),
    distinctUntilChanged(),
    tap(() => this.isLoading = true),
  );

  isAuthenticated = false;
  subscriptions: Subscription[] = [];
  results: TweetUser[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private tweetService: TweetService) {
    this.listenAuthStatus();
  }

  ngOnInit(): void {
    const subscription = this.trigger.subscribe(currentValue => {
        this.onTextChange(currentValue);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  private listenAuthStatus() {
    this.subscriptions.push(
    this.accountService.currentUser$
      .subscribe((user: User | null) => {
        if (user?.token) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      })
    );
  }

  onLogout() {
    this.accountService.logout();
    this.router.navigate(['/'])
  }

  viewProfile() {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      this.router.navigate(['user', 'me'], {queryParams: {
        email: JSON.parse(userEmail)
      }});
    }
  }

  onInput(e: any) {
    this.inputValue.next(e.target.value);
  }

  onTextChange(changedText: string) {
    const searchSubs = this.tweetService
      .search(changedText)
      .subscribe({
        next: response => {
          this.results = response.search_results;
          this.isLoading = false;
        },
        error: errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
        }
      });
    this.subscriptions.push(searchSubs);
  }

  onChangeModel() {
    if (this.selectedUser) {
      this.router.navigate(['user', this.selectedUser.id], {queryParams: {
        email: this.selectedUser.email
      }});
    }
  }

}
