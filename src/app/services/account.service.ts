import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Login, Signup, User } from '../interfaces/Account.interfaces';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private httpService: HttpService
  ) { }

  register(signupModel: Signup) {
    return this.httpService.post<User>('signup', signupModel).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  test() {
    return this.httpService.get('');
  }

  login(loginModel: Login) {
    return this.httpService.post<User>('login', loginModel).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
}
