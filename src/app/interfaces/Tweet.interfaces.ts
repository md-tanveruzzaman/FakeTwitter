export interface TweetPost {
    content: string;
}

export interface TweetUser {
    active: boolean;
    email: string;
    id: number;
    username: string;
    join_date?: string;
}

export interface Tweet {
    content: string;
    id: number;
    published: string;
    user: TweetUser;
}

export interface TweetPostResponse {
    message: string;
    tweet: Tweet;
}