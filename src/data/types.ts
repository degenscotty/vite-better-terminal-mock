export interface ConfidenceBreakdown {
  position: number;
  trackRecord: number;
  market: number;
  corroboration: number;
  timing: number;
}

export interface ChartPoint {
  day: number;
  value: number;
}

export interface PerformanceData {
  roe: number;
  winRate: number;
  profitFactor: number;
  fills: number;
  chartPoints: ChartPoint[];
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  imbalance: number;
}

export interface PricePoint {
  time: number;
  price: number;
}

export interface Signal {
  id: string;
  timestamp: Date;
  operator: string;
  confidence: number;
  market: string;
  price: number;
  size: number;
  action: "BUY" | "SELL";
  outcome: "YES" | "NO";
  delta: number;
  spread: number;
  pnl30d: number;
  pnl7d: number;
  sharpe30d: number;
  metadata: string;
  bid: number;
  ask: number;
  expiryDate: string;
  notional: number;
  trades24h: number;
  volume: number;
  traderPositions: number;
  confidenceBreakdown: ConfidenceBreakdown;
  performanceData: PerformanceData;
  orderbook: OrderBook;
  category: string;
  priceHistory: PricePoint[];
}

export interface Position {
  id: string;
  market: string;
  side: "Yes" | "No";
  entry: number;
  shares: number;
  cost: number;
  pnl: number;
  status: "ACTIVE" | "RESOLVED" | "LOST";
  wonOutcome?: string;
}
