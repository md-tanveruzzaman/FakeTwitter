import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationParams } from 'src/app/interfaces/Pagination';
import { Tweet, TweetUser } from 'src/app/interfaces/Tweet.interfaces';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user: any = {};
  userId: number = 0;
  tweets: Tweet[] = [];

  followers: TweetUser[] = [];
  followings: TweetUser[] = [];
  isSelf: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private tweetService: TweetService,
    private router: Router
  ) {
    this.activeRoute.queryParams.subscribe({
      next: params => {
        this.user.email = params['email'];
      }
    });

    this.activeRoute.params.subscribe({
      next: (param) => {
        if (param['id'] === 'me') {
          this.isSelf = true;
          this.userId = param['id'];
          this.user.id = this.userId;
        } else {
          const email = localStorage.getItem('email');
          if (email && this.user.email === JSON.parse(email)) {
            this.isSelf = true;
          } else {
            this.isSelf = false;
          }
          this.userId = +param['id'];
          this.user.id = this.userId;
        }
        this.getUserTweet();
        this.getProfileFollowers();
        this.getProfileFollowings();
      }
    })
  }

  ngOnInit(): void {

  }

  private getProfileFollowings() {
    this.tweetService.getFollowingsListByUser(this.userId, new PaginationParams(), this.isSelf)
    .subscribe({
      next: res => {
        if (res.count > 0)
          this.followings = res.followings;
        else this.followings = [];
      }
    })
  }

  private getProfileFollowers() {
    this.tweetService.getFollowersListByUser(this.userId, new PaginationParams(), this.isSelf)
      .subscribe({
        next: res => {
          if (res.count > 0)
            this.followers = res.followers;
          else this.followers = [];
        }
      })
  }

  private getUserTweet() {
    const paginationParams = new PaginationParams();
    this.tweetService.getTweetByUser(this.userId, paginationParams, this.isSelf)
      .subscribe({
        next: (res) => {
          if (res.count > 0) {
            this.tweets = this.isSelf ? res.my_tweets : res.tweets;
          } else this.tweets = [];
        }
      })
  }

  onClickUser(user: TweetUser) {
    if (user) {
      if (user) {
        this.router.navigate(['user', user.id], {queryParams: {
          email: user.email
        }});
      }
    }
  }


}
