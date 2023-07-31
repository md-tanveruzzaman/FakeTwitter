import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TweetUser } from 'src/app/interfaces/Tweet.interfaces';

@Component({
  selector: 'app-profile-followers-following',
  templateUrl: './profile-followers-following.component.html',
  styleUrls: ['./profile-followers-following.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileFollowersFollowingComponent {

  @Input() user:TweetUser = {} as TweetUser;


}
