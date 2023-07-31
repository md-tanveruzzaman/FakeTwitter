import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { LeftSideBarComponent } from 'src/app/components/left-side-bar/left-side-bar.component';
import { TweetFeedComponent } from '../dashboard/tweet-feed/tweet-feed.component';
import { TweetComponent } from '../dashboard/tweet/tweet.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: UsersComponent}
];

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LeftSideBarComponent
  ],
  exports: [
    RouterModule
  ]
})
export class UsersModule { }
