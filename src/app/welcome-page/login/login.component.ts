import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule], 
})
export class LoginComponent {
  email: string = '';
  password: string = ''; 
  errorMessage: string = '';

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill both fields';
    } else {
      this.errorMessage = '';
      console.log('Logging in with', this.email, this.password);
    }
  }
}
