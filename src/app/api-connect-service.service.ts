import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequestModel } from './Models/LoginRequestModel ';
import { ForgotPasswordRequestModel } from './Models/ForgotPasswordRequestModel ';
import { RegistrationRequestModel } from './Models/RegistrationRequestModel ';
import { ResetPasswordRequestModel } from './Models/ResetPasswordRequestModel';
import { TokenCacheDto } from './Models/TokenCacheDto';
import { LiquidityPool } from './Models/LiquidityPool';
import { FavoriteTokenDto } from './Models/FavoriteTokenDto';
import { NotificationDTO } from './Models/NotificationDTO';

@Injectable({
  providedIn: 'root'
})

export class ApiConnectServiceService {
  private apiBaseUrl = 'https://localhost:7098/api';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequestModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/account/Login`, loginRequest, {
      withCredentials: true,
    });
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
    return this.http.get<LiquidityPool[]>(`${this.apiBaseUrl}/cache/LiquidityPools`).pipe(
      tap(data => console.log('API Response:', data))
    );
  }

  addFavoriteToken(tokenId: number): Observable<any> {
    return this.http.post(
      `${this.apiBaseUrl}/user/AddTokenToFavourites/${tokenId}`,
      {}, { withCredentials: true }
    );
  }

  removeFavoriteToken(tokenId: number): Observable<any> {
    return this.http.delete(
      `${this.apiBaseUrl}/user/DeleteTokenFromFavourites/${tokenId}`,
      { withCredentials: true }
    );
  }

  getFavoriteTokens(): Observable<FavoriteTokenDto[]> {
    return this.http.get<FavoriteTokenDto[]>(
      `${this.apiBaseUrl}/user/GetTokenFavouritesList`,
      { withCredentials: true }
    );
  }

  getNotifications(): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(
      `${this.apiBaseUrl}/user/GetNotifications`,
      { withCredentials: true }
    );
  }
  
  markNotificationAsRead(notificationId: number): Observable<any> {
    return this.http.patch(
      `${this.apiBaseUrl}/user/MarkNotificationAsRead/${notificationId}`,
      {},
      { withCredentials: true }
    );
  }

  calculateAndSendNotifications(): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/user/CalculateAndSendNotifications`, {}, { withCredentials: true });
  }
}