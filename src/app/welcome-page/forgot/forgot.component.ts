import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiConnectServiceService } from '../../api-connect-service.service';
import { ForgotPasswordRequestModel } from '../../Models/ForgotPasswordRequestModel ';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiConnectServiceService) {}

  onSend() {
    if (!this.email) {
      this.errorMessage = 'Please provide an email.';
      this.successMessage = '';
      return;
    }

    const request: ForgotPasswordRequestModel = { email: this.email };

    this.apiService.forgotPassword(request).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'A reset link has been sent to your email.';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to send reset link. Please try again.';
        this.successMessage = '';
      },
    });
  }
}