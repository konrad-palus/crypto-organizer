import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestModel } from './Models/LoginRequestModel ';
import { ForgotPasswordRequestModel } from './Models/ForgotPasswordRequestModel ';
import { RegistrationRequestModel } from './Models/RegistrationRequestModel ';
import { ResetPasswordRequestModel } from './Models/ResetPasswordRequestModel';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectServiceService {
  private apiBaseUrl = 'https://localhost:7098/api/account';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequestModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/Login`, loginRequest);
  }

  register(registrationRequest: RegistrationRequestModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/Register`, registrationRequest);
  }

  forgotPassword(forgotPasswordRequest: ForgotPasswordRequestModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/ForgotPassword`, forgotPasswordRequest);
  }

  resetPassword(email: string, token: string, resetPasswordRequest: ResetPasswordRequestModel): Observable<any> {
    const url = `${this.apiBaseUrl}/ResetPassword?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
    return this.http.post(url, resetPasswordRequest);
  }
}