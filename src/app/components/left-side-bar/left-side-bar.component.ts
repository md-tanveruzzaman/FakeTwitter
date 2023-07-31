import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Follow } from 'src/app/enums/follow.enums';
import { FollowUserBody } from 'src/app/interfaces/Follow.interface';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  standalone: true,
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss'],
  imports: [CommonModule]
})
export class LeftSideBarComponent {
  @Input() user: any;
  @Input() showFollowButton = false;
  now: number = Date.now();
  followButtonLabel = Follow.Follow;

  constructor(
    private tweetService: TweetService,
    private toasterService: ToastrService
    ) {}

  toggleFollow() {
    const userBody: FollowUserBody = {
      user_id: this.user.id
    }
    if (this.followButtonLabel === Follow.Follow) {
      this.tweetService.followAUser(userBody)
        .subscribe({
          next: res => {
            if (res.resp) {
              this.toasterService.success(res.resp);
              this.followButtonLabel = Follow.Unfollow;
            } else {
              this.toasterService.error('Something went wrong!');
            }
          },
          error: (err) => {
            this.toasterService.error('Something went wrong!', 'Http Error');
          }
        })
    } else if (this.followButtonLabel === Follow.Unfollow) {
      this.tweetService.unFollowAUser(userBody)
        .subscribe({
          next: res => {
            if (res.resp) {
              this.toasterService.success(res.resp);
              this.followButtonLabel = Follow.Follow;
            } else {
              this.toasterService.error('Something went wrong!');
            }
          }
        })
    }
  }
}
