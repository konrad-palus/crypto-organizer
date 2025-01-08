import { Component, OnInit } from '@angular/core';
import { TokenCacheDto } from '../../Models/TokenCacheDto';
import { FavoriteTokenDto } from '../../Models/FavoriteTokenDto';
import { ApiConnectServiceService } from '../../api-connect-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tokens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  tokens: TokenCacheDto[] = [];
  favoriteTokens: FavoriteTokenDto[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiConnectServiceService) {}

  ngOnInit(): void {
    this.loadTokens();
    this.loadFavoriteTokens();
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

  loadFavoriteTokens(): void {
    this.apiService.getFavoriteTokens().subscribe({
      next: (favorites: FavoriteTokenDto[]) => {
        this.favoriteTokens = favorites;
      },
      error: (error) => {
        console.error('Failed to load favorite tokens:', error);
        this.favoriteTokens = [];
      }
    });
  }

  toggleFavorite(token: TokenCacheDto): void {
    const isFavorite = this.isFavorite(token);

    if (isFavorite) {
      this.apiService.removeFavoriteToken(token.tokenId).subscribe({
        next: () => {
          this.favoriteTokens = this.favoriteTokens.filter(
            fav => fav.tokenName !== token.tokenName
          );
        },
        error: (error) => {
          console.error('Failed to remove token from favorites:', error);
        }
      });
    } else {
      this.apiService.addFavoriteToken(token.tokenId).subscribe({
        next: () => {
          this.favoriteTokens.push({
            tokenName: token.tokenName,
            ticker: token.ticker,
            slug: token.slug
          });
        },
        error: (error) => {
          console.error('Failed to add token to favorites:', error);
        }
      });
    }
  }

  isFavorite(token: TokenCacheDto): boolean {
    return this.favoriteTokens.some(fav => fav.tokenName === token.tokenName);
  }
}