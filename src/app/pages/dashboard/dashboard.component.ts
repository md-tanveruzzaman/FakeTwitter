import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user = {
    name: 'tanver',
    handle: '@SpectacledCaiman'
  }
  now: number = Date.now();
}
