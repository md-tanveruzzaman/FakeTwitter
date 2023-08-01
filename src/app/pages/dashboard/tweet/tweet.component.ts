import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Tweet, TweetUser } from 'src/app/interfaces/Tweet.interfaces';

@Component({
  standalone: true,
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
  imports: [RouterModule, DatePipe]
})
export class TweetComponent {

  @Input() imageNumber: number = 1;
  @Input() tweet: Tweet = {} as Tweet;

  constructor(
    private router: Router
  ) { }


  onClickView(user: TweetUser) {
    this.router.navigate(['user', user.id], {queryParams: {
      email: user.email
    }});
  }
  

}
