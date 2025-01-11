import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiConnectServiceService } from '../api-connect-service.service';
import { NotificationDTO } from '../Models/NotificationDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  imports: [RouterOutlet, CommonModule],
  standalone: true
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  notifications: NotificationDTO[] = [];
  unreadCount: number = 0;
  isNotificationsOpen: boolean = false;
  errorMessage: string = '';
  private intervalId: any;

  constructor(private router: Router, private apiService: ApiConnectServiceService) {}

  ngOnInit(): void {
    this.loadNotifications();

    this.intervalId = setInterval(() => {
      this.loadNotifications();
      this.triggerNotificationCalculation();
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadNotifications(): void {
    this.apiService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.unreadCount = data.length;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load notifications.';
      },
    });
  }

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  markAsRead(notificationId: number): void {
    this.apiService.markNotificationAsRead(notificationId).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        this.unreadCount = this.notifications.length;
      },
      error: (error) => {
        console.error('Failed to mark notification as read:', error);
      },
    });
  }

  triggerNotificationCalculation(): void {
    this.apiService.calculateAndSendNotifications().subscribe({
      next: () => {
        console.log('Notifications calculated and sent.');
      },
      error: (error) => {
        console.error('Failed to calculate and send notifications:', error);
      },
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome/login']);
  }

  navigateTo(path: string): void {
    this.router.navigate([`dashboard/${path}`]);
  }
}