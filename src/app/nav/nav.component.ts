import { Component, Input, OnDestroy } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/Account.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy{

  @Input() title!: string;

  isAuthenticated = false;
  subscriptions: Subscription[] = [];

  constructor(private accountService: AccountService, private router: Router) {
    this.listenAuthStatus();
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

}
