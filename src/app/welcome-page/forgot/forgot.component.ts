import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  onSend() {
    if (!this.email) {
      this.errorMessage = 'Please provide an email.';
      this.successMessage = '';
    } else {
      this.errorMessage = '';
      this.successMessage =
        'If there was an account with this email, a reset link has been sent.';
    }
  }
}
