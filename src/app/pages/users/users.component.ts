import { Component } from '@angular/core';
import { IPaginationParams, PaginationParams } from 'src/app/interfaces/Pagination';
import { TweetUser } from 'src/app/interfaces/Tweet.interfaces';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  user = {
    name: 'tanver',
    handle: '@SpectacledCaiman'
  }

  users: TweetUser[] = [];

  constructor(
    private tweetService: TweetService
  ) {
    this.getUsersList();
  }

  private getUsersList() {
    const paginationParams = new PaginationParams();
    this.tweetService.getUsers(paginationParams)
      .subscribe({
        next: (res) => {
          if (res.count > 0) {
            this.users = res.users;
          }
        }
      })
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
