import type { Coin, Currency } from "./types.js";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchPrices(
    coinIds: string[],
    currency: Currency = "eur",
): Promise<Coin[]> {
    const params = new URLSearchParams({
        vs_currency: currency,
        ids: coinIds.join(","),
    });

    const url = `${BASE_URL}/coins/markets?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API antwortete mit Status ${response.status}`);
    }

    // TODO: Tag 8 — mit zod validieren statt blind casten
    const data: unknown = await response.json();
    return data as Coin[];
}