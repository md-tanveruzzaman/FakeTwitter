import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IPaginationParams, PaginationParams } from 'src/app/interfaces/Pagination';
import { Tweet, TweetPost, TweetPostResponse } from 'src/app/interfaces/Tweet.interfaces';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-feed',
  templateUrl: './tweet-feed.component.html',
  styleUrls: ['./tweet-feed.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          opacity: 1
        })
      ),
      state(
        'closed',
        style({
          opacity: 0
        })
      ),
      transition('open => closed', [animate('2s')]),
      transition('closed => open', [animate('1s')])
    ])
  ]
})
export class TweetFeedComponent {

  isOpen = false;
  imageNumber = Date.now() + Math.random();
  hide = true;
  tweets: Tweet[] = [];
  paginationParams: IPaginationParams = {
    size: 10,
    page: 1
  }
  count = 0;
  @ViewChild('newTweetText') newTweetText: ElementRef = {} as ElementRef;

  constructor(
    private tweetService: TweetService,
    private toaster: ToastrService
  ) {
    this.getTimeline();
  }

  private getTimeline() {
    const paginationParams = new PaginationParams(this.paginationParams);

    this.tweetService.getTimeline(paginationParams)
      .subscribe({
        next: (res) => {
          this.count = res.count;
          this.tweets = res.timeline;
        }
      })
  }

  nextPagination() {
    if (this.count === this.paginationParams.size) {
      this.paginationParams.page ++;
      this.getTimeline();
    }
  }

  prevPagination() {
    if (this.paginationParams.page > 1) {
      this.paginationParams.page --;
      this.getTimeline();
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.hide = !this.hide;
  }

  addTweet(tweetText: string) {
    if (tweetText && tweetText.length > 0) {
      const tweetPost: TweetPost = {
        content: tweetText
      };

      this.tweetService.addTweet(tweetPost)
        .subscribe({
          next: (res: TweetPostResponse) => {
            if (res.tweet) {
              this.toaster.success(res.message);
              this.newTweetText.nativeElement.value = '';
            } else {
              this.toaster.error("Couldn't save the Tweet");
            }
          },
          error: (err) => {
            this.toaster.error("Something went wrong!", "HTTP ERROR");
          }
        })
    }
  }

}
