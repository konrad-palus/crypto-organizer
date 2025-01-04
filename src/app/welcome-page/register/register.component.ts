import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiConnectServiceService } from '../../api-connect-service.service'; 
import { RegistrationRequestModel } from '../../Models/RegistrationRequestModel ';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationData: RegistrationRequestModel = {
    username: '',
    email: '',
    password: ''
  };

  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiConnectServiceService, private router: Router) {}

  onRegister() {

    if (!this.registrationData.username || !this.registrationData.email || !this.registrationData.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required';
      this.successMessage = '';
      return;
    }

    if (this.registrationData.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.successMessage = '';
      return;
    }

    this.apiService.register(this.registrationData).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private handleSuccess() {
    this.successMessage = 'Registration successful! Confirm your email.';
    this.errorMessage = '';
    setTimeout(() => this.router.navigate(['../login']), 2000);
  }

  private handleError(error: any) {
    this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
    this.successMessage = '';
  }
}