import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiConnectServiceService } from '../../api-connect-service.service';
import { ResetPasswordRequestModel } from '../../Models/ResetPasswordRequestModel';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [FormsModule, CommonModule],
})

export class ResetPasswordComponent {
  resetPasswordData: ResetPasswordRequestModel = {
    password: '',
    confirmPassword: '',
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiConnectServiceService,
    private router: Router
  ) {}

  onSend() {
    if (!this.resetPasswordData.password || !this.resetPasswordData.confirmPassword) {
      this.errorMessage = 'Please fill in both password fields.';
      this.successMessage = '';
      return;
    }

    if (this.resetPasswordData.password !== this.resetPasswordData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.successMessage = '';
      return;
    }

    const email = this.route.snapshot.queryParamMap.get('email');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!email || !token) {
      this.errorMessage = 'Invalid reset link.';
      this.successMessage = '';
      return;
    }

    this.apiService.resetPassword(email, token, this.resetPasswordData).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Password reset successful!';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/welcome/login']), 3000); 
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
        this.successMessage = '';
      },
    });
  }
}