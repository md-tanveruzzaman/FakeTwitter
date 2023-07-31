import { Tweet, TweetUser } from "./Tweet.interfaces";

export class PaginationParams implements IPaginationParams {
    size = 30;
    page = 1;

    constructor(data?: IPaginationParams) {
        if (data) {
            this.page = data.page;
            this.size = data.size;
        }
    }
}

export interface IPaginationParams {
    size: number;
    page: number;
}

export interface PaginationResponse {
    count: number;
}

export interface UsersPaginationResponse extends PaginationResponse{
    users: TweetUser[];
}

export interface TweetByUserPaginationResponse extends PaginationResponse{
    tweets: Tweet[];
    my_tweets: Tweet[];
}

export interface timelinePaginationResponse extends PaginationResponse{
    timeline: Tweet[];
}

export interface FollowersPaginationResponse extends PaginationResponse{
    followers: TweetUser[];
}

export interface FollowingsPaginationResponse extends PaginationResponse{
    followings: TweetUser[];
}

