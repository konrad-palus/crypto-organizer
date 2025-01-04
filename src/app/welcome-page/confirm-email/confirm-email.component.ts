import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent {
  status: string | null = null;
  message: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.status = this.route.snapshot.queryParamMap.get('status');
    this.message = this.route.snapshot.queryParamMap.get('message');
  }
}
