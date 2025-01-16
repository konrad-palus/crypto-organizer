import { Component, OnInit } from '@angular/core';
import { ApiConnectServiceService } from '../../api-connect-service.service';
import { LiquidityPool } from '../../Models/LiquidityPool';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liquidity-pools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liquidity-pools.component.html',
  styleUrls: ['./liquidity-pools.component.scss'],
})
export class LiquidityPoolsComponent implements OnInit {
  liquidityPools: LiquidityPool[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiConnectServiceService) {}

  ngOnInit(): void {
    this.loadLiquidityPools();
  }

  loadLiquidityPools(): void {
    this.apiService.getLiquidityPools().subscribe({
      next: (data) => {
        console.log('Raw API Data:', data);

        this.liquidityPools = data;

        console.log('Liquidity Pools:', this.liquidityPools);
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Failed to load liquidity pools.';
        console.error('API Error:', error);
      },
    });
  }
}
