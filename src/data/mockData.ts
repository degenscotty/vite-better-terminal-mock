import type { Signal, Position, OrderBookEntry, ChartPoint, PricePoint } from "./types";

const markets = [
  "Will BTC reach $100k before July 2026?",
  "Will ETH flip BTC market cap in 2026?",
  "Will the Fed cut rates in Q2 2026?",
  "Will Trump win the 2028 Republican primary?",
  "Will SpaceX land on Mars before 2030?",
  "Will Apple release AR glasses in 2026?",
  "Will US GDP growth exceed 3% in 2026?",
  "Will NVIDIA stock exceed $200 by EOY?",
  "Will the S&P 500 reach 7000 in 2026?",
  "Will OpenAI IPO in 2026?",
  "Will there be a US government shutdown in Q2?",
  "Will gas prices exceed $5/gal national avg?",
  "Will Tesla deliver 2M+ vehicles in 2026?",
  "Will Bitcoin ETF inflows exceed $50B cumulative?",
  "Will EU pass comprehensive AI regulation?",
  "Will the USD/EUR rate drop below 0.85?",
  "Will Anthropic raise another funding round?",
  "Will global temps exceed 1.5C above pre-industrial?",
  "Will China invade Taiwan before 2028?",
  "Will a major US bank fail in 2026?",
  "Will Solana TVL exceed $20B?",
  "Will there be a ceasefire in Ukraine by July?",
  "Will California pass single-payer healthcare?",
  "Will the next iPhone have a foldable screen?",
  "Will inflation drop below 2% in the US?",
];

const operators = [
  "0x7a3F...9b2E",
  "0xd4C1...8f3A",
  "0x2bE9...1c7D",
  "0x9fA3...4e6B",
  "0x1cD8...7a9F",
  "0x6eB2...3d5C",
  "0x8aF1...2b4E",
  "0x3dC7...6f8A",
];

const categories = ["TR", "POL", "FIN", "TECH", "CRYPTO", "GEO", "ECON"];
const metadataOptions = [
  "polymarket:clob",
  "gamma:amm",
  "polymarket:neg-risk",
  "kalshi:event",
  "polymarket:binary",
];

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateChartPoints(): ChartPoint[] {
  const points: ChartPoint[] = [];
  let value = rand(0.3, 0.7);
  for (let day = 0; day <= 90; day += 3) {
    value = Math.max(0.01, Math.min(0.99, value + rand(-0.08, 0.08)));
    points.push({ day, value: Math.round(value * 100) / 100 });
  }
  return points;
}

function generateOrderbook(): { bids: OrderBookEntry[]; asks: OrderBookEntry[]; imbalance: number } {
  const midPrice = rand(0.3, 0.8);
  const bids: OrderBookEntry[] = [];
  const asks: OrderBookEntry[] = [];
  let bidTotal = 0;
  let askTotal = 0;

  for (let i = 0; i < 8; i++) {
    const bidSize = Math.round(rand(50, 500));
    bidTotal += bidSize;
    bids.push({
      price: Math.round((midPrice - (i + 1) * 0.01) * 100) / 100,
      size: bidSize,
      total: bidTotal,
    });

    const askSize = Math.round(rand(50, 500));
    askTotal += askSize;
    asks.push({
      price: Math.round((midPrice + (i + 1) * 0.01) * 100) / 100,
      size: askSize,
      total: askTotal,
    });
  }

  const imbalance = Math.round(((bidTotal - askTotal) / (bidTotal + askTotal)) * 100) / 100;
  return { bids, asks, imbalance };
}

function generatePriceHistory(currentPrice: number): PricePoint[] {
  const points: PricePoint[] = [];
  const now = Date.now();
  let price = Math.max(0.02, Math.min(0.98, currentPrice + rand(-0.3, 0.3)));
  // 30 days of hourly-ish data (every 4 hours = 180 points)
  for (let i = 180; i >= 0; i--) {
    price = Math.max(0.01, Math.min(0.99, price + rand(-0.02, 0.02)));
    points.push({
      time: now - i * 4 * 60 * 60 * 1000,
      price: Math.round(price * 100) / 100,
    });
  }
  // Ensure last point matches current price
  points[points.length - 1].price = currentPrice;
  return points;
}

export function generateSignal(id?: string): Signal {
  const price = Math.round(rand(0.05, 0.95) * 100) / 100;
  const spread = Math.round(rand(0.01, 0.05) * 100) / 100;
  const bid = Math.round((price - spread / 2) * 100) / 100;
  const ask = Math.round((price + spread / 2) * 100) / 100;
  const action = Math.random() > 0.5 ? "BUY" : "SELL" as const;
  const size = Math.round(rand(5, 200) * 100) / 100;

  return {
    id: id || `sig-${Date.now()}-${randInt(1000, 9999)}`,
    timestamp: new Date(Date.now() - randInt(0, 300000)),
    operator: pick(operators),
    confidence: randInt(45, 98),
    market: pick(markets),
    price,
    size,
    action,
    outcome: action === "BUY" ? "YES" : "NO",
    delta: Math.round(rand(-0.15, 0.15) * 100) / 100,
    spread,
    pnl30d: Math.round(rand(-30, 50) * 100) / 100,
    pnl7d: Math.round(rand(-15, 25) * 100) / 100,
    sharpe30d: Math.round(rand(-1, 3) * 100) / 100,
    metadata: pick(metadataOptions),
    bid,
    ask,
    expiryDate: "2026-12-31",
    notional: Math.round(size * price * 100) / 100,
    trades24h: randInt(10, 500),
    volume: randInt(1000, 100000),
    traderPositions: randInt(1, 20),
    confidenceBreakdown: {
      position: randInt(30, 95),
      trackRecord: randInt(40, 95),
      market: randInt(35, 90),
      corroboration: randInt(20, 85),
      timing: randInt(40, 95),
    },
    performanceData: {
      roe: Math.round(rand(-20, 60) * 100) / 100,
      winRate: Math.round(rand(0.35, 0.8) * 100) / 100,
      profitFactor: Math.round(rand(0.5, 3.5) * 100) / 100,
      fills: randInt(5, 200),
      chartPoints: generateChartPoints(),
    },
    orderbook: generateOrderbook(),
    category: pick(categories),
    priceHistory: generatePriceHistory(price),
  };
}

export function generateInitialSignals(count: number = 25): Signal[] {
  return Array.from({ length: count }, (_, i) => {
    const signal = generateSignal(`sig-init-${i}`);
    signal.timestamp = new Date(Date.now() - (count - i) * 12000);
    return signal;
  });
}

export function generatePositions(): Position[] {
  return [
    {
      id: "pos-1",
      market: "Will BTC reach $100k before July 2026?",
      side: "Yes",
      entry: 0.72,
      shares: 13.88,
      cost: 9.99,
      pnl: -9.99,
      status: "LOST",
      wonOutcome: "No",
    },
    {
      id: "pos-2",
      market: "Will the Fed cut rates in Q2 2026?",
      side: "Yes",
      entry: 0.55,
      shares: 18.18,
      cost: 10.0,
      pnl: 8.18,
      status: "RESOLVED",
      wonOutcome: "Yes",
    },
    {
      id: "pos-3",
      market: "Will NVIDIA stock exceed $200 by EOY?",
      side: "Yes",
      entry: 0.68,
      shares: 14.7,
      cost: 10.0,
      pnl: 0,
      status: "ACTIVE",
    },
    {
      id: "pos-4",
      market: "Will OpenAI IPO in 2026?",
      side: "No",
      entry: 0.35,
      shares: 28.57,
      cost: 10.0,
      pnl: -10.0,
      status: "LOST",
      wonOutcome: "Yes",
    },
    {
      id: "pos-5",
      market: "Will the S&P 500 reach 7000 in 2026?",
      side: "Yes",
      entry: 0.42,
      shares: 23.8,
      cost: 10.0,
      pnl: 13.8,
      status: "RESOLVED",
      wonOutcome: "Yes",
    },
    {
      id: "pos-6",
      market: "Will Solana TVL exceed $20B?",
      side: "Yes",
      entry: 0.61,
      shares: 16.39,
      cost: 10.0,
      pnl: 2.34,
      status: "ACTIVE",
    },
  ];
}
