import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestModel } from './Models/LoginRequestModel ';
import { ForgotPasswordRequestModel } from './Models/ForgotPasswordRequestModel ';
import { RegistrationRequestModel } from './Models/RegistrationRequestModel ';
import { ResetPasswordRequestModel } from './Models/ResetPasswordRequestModel';
import { TokenCacheDto } from './Models/TokenCacheDto';
import { LiquidityPool } from './Models/LiquidityPool';

@Injectable({
  providedIn: 'root'
})

export class ApiConnectServiceService {
  private apiBaseUrl = 'https://localhost:7098/api';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequestModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/account/Login`, loginRequest);
  }

  register(registrationRequest: RegistrationRequestModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/account/Register`, registrationRequest);
  }

  forgotPassword(forgotPasswordRequest: ForgotPasswordRequestModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/account/ForgotPassword`, forgotPasswordRequest);
  }

  resetPassword(email: string, token: string, resetPasswordRequest: ResetPasswordRequestModel): Observable<any> {
    const url = `${this.apiBaseUrl}/account/ResetPassword?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
    return this.http.post(url, resetPasswordRequest);
  }

  getTokens(): Observable<TokenCacheDto[]> {
    return this.http.get<TokenCacheDto[]>(`${this.apiBaseUrl}/cache/Tokens`);
  }

  getLiquidityPools(): Observable<LiquidityPool[]> {
    return this.http.get<LiquidityPool[]>(`${this.apiBaseUrl}/cache/LiquidityPools`);
  }
}