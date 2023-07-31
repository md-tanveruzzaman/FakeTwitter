import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tweet } from 'src/app/interfaces/Tweet.interfaces';
import { TweetService } from 'src/app/services/tweet.service';

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
    private tweetService: TweetService
  ) { }

  

}
