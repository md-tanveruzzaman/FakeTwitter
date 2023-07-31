import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Login, Signup, User } from '../interfaces/Account.interfaces';
import { BehaviorSubject, Observable, map } from 'rxjs';

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
    return this.httpService.post('signup', signupModel);
  }

  login(loginModel: Login): Observable<User> {
    return this.httpService.post<User>('login', loginModel).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          localStorage.setItem('token', JSON.stringify(user.token));
          localStorage.setItem('email', JSON.stringify(loginModel.email));
          this.currentUserSource.next(user);
        }
        return res;
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
}
