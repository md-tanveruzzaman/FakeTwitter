export interface Login {
    email: string;
    password: string;
}

export interface User {
    token: string;
}

export interface Signup {
    email: string;
    password: string;
    username: string;
}