import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TweetPost, TweetPostResponse, TweetUser } from '../interfaces/Tweet.interfaces';
import { FollowersPaginationResponse, FollowingsPaginationResponse, PaginationParams, PaginationResponse, TweetByUserPaginationResponse, UsersPaginationResponse, timelinePaginationResponse } from '../interfaces/Pagination';
import { FollowUserBody, FollowUserResp } from '../interfaces/Follow.interface';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(
    private httpService: HttpService
  ) { }

  addTweet(body: TweetPost) {
    return this.httpService.post<TweetPostResponse>('tweet', body);
  }

  getTimeline(paginationParams: PaginationParams) {
    return this.httpService.get<timelinePaginationResponse>('timeline', paginationParams);
  }

  getUsers(paginationParams: PaginationParams) {
    return this.httpService.get<UsersPaginationResponse>('users', paginationParams);
  }

  getTweetByUser(userId: number, paginationParams: PaginationParams, isSelf: boolean) {
    const endpoint = isSelf ? 'my-tweets' : `users/${userId}/tweets`;
    return this.httpService.get<TweetByUserPaginationResponse>(endpoint, paginationParams);
  }

  followAUser(userBody: FollowUserBody) {
    return this.httpService.post<FollowUserResp>('follow', userBody);
  }

  unFollowAUser(userBody: FollowUserBody) {
    return this.httpService.post<FollowUserResp>('unfollow', userBody);
  }

  getFollowersListByUser(userId: number, paginationParams: PaginationParams, isSelf: boolean) {
    const endpoint = isSelf ? 'followers' : `users/${userId}/followers`;
    return this.httpService.get<FollowersPaginationResponse>(endpoint, paginationParams);
  }

  getFollowingsListByUser(userId: number, paginationParams: PaginationParams, isSelf: boolean) {
    const endpoint = isSelf ? 'following' : `users/${userId}/following`;
    return this.httpService.get<FollowingsPaginationResponse>(endpoint, paginationParams);
  }
}
