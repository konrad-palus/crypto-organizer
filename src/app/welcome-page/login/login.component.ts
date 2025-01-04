import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiConnectServiceService } from '../../api-connect-service.service';
import { LoginRequestModel } from '../../Models/LoginRequestModel ';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  loginData: LoginRequestModel = {
    login: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(private apiService: ApiConnectServiceService, private router: Router) {}

  onLogin() {
    if (!this.loginData.login || !this.loginData.password) {
      this.errorMessage = 'Please fill both fields';
      return;
    }

    this.apiService.login(this.loginData).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/dashboard']); 
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      },
    });
  }
}
