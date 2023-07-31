import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TweetUser } from 'src/app/interfaces/Tweet.interfaces';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent {

  @Input() tweetUser: TweetUser = {} as TweetUser;

  followLabel = 'Follow';
  now: number = Date.now() + Math.random();

  constructor(
    private tweetService: TweetService,
    private router: Router
  ) {}

  view(user: TweetUser) {
    if (user) {
      this.router.navigate(['user', user.id], {queryParams: {
        email: user.email
      }});
    }
  }

}
