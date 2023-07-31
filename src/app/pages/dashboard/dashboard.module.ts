import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TweetFeedComponent } from './tweet-feed/tweet-feed.component';
import { TweetComponent } from './tweet/tweet.component';
import { LeftSideBarComponent } from 'src/app/components/left-side-bar/left-side-bar.component';

const routes: Routes = [
  { path: '', component: DashboardComponent}
];

@NgModule({
  declarations: [
    DashboardComponent,
    TweetFeedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    LeftSideBarComponent,
    TweetComponent
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
