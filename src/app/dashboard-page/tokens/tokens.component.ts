import { Component, OnInit } from '@angular/core';
import { TokenCacheDto } from '../../Models/TokenCacheDto';
import { ApiConnectServiceService } from '../../api-connect-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tokens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tokens.component.html',
  styleUrl: './tokens.component.scss'
})
export class TokensComponent implements OnInit {
  tokens: TokenCacheDto[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiConnectServiceService) {}

  ngOnInit(): void {
    this.loadTokens();
  }

  loadTokens(): void {
    this.apiService.getTokens().subscribe({
      next: (data) => {
        this.tokens = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load tokens.';
      }
    });
  }

  toggleFavorite(token: TokenCacheDto): void {
  }
}