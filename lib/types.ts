// src/lib/types.ts
// Zentrale Typdefinitionen für die App

export type Currency = "eur" | "usd";

export interface Coin {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
}