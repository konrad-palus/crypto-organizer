import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  imports: [RouterOutlet],
  standalone: true
})
export class DashboardPageComponent {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome/login']);
  }

  navigateTo(path: string): void {
    console.log(`Navigating to: ${path}`);
    this.router.navigate([`/dashboard/${path}`]);
  }
}
