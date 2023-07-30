import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './interfaces/Account.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Fake-Twitter';

  constructor(private accountService: AccountService) {

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
}
