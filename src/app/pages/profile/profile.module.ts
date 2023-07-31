import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { LeftSideBarComponent } from 'src/app/components/left-side-bar/left-side-bar.component';
import { TweetComponent } from '../dashboard/tweet/tweet.component';
import { ProfileFollowersFollowingComponent } from './profile-followers-following/profile-followers-following.component';

const routes: Routes = [
  { path: ':id', component: ProfileComponent}
];

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileFollowersFollowingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LeftSideBarComponent,
    TweetComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileModule { }
