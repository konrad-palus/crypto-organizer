import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidityPoolsComponent } from './liquidity-pools.component';

describe('LiquidityPoolsComponent', () => {
  let component: LiquidityPoolsComponent;
  let fixture: ComponentFixture<LiquidityPoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidityPoolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiquidityPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
