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
        const sortedPools = data.sort((a, b) => a.buyPrice - b.buyPrice);
        const latestTimestamp = Math.max(...sortedPools.map((pool) => new Date(pool.lastUpdated).getTime()));

        const freshPools = sortedPools.filter((pool) => latestTimestamp - new Date(pool.lastUpdated).getTime() <= 60000);
        const olderPools = sortedPools.filter((pool) =>latestTimestamp - new Date(pool.lastUpdated).getTime() > 60000);

        this.liquidityPools = [...freshPools, ...olderPools];
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Failed to load liquidity pools.';
      },
    });
  }
}