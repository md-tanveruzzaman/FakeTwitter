import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user: any= {}
  now: number = Date.now();

  constructor() {
    const email = localStorage.getItem('email');
    if (email)
      this.user.email = JSON.parse(email);
  }
}
