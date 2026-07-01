import type { Coin, Currency } from "./types.js";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Type Guard: prüft zur Laufzeit, ob ein unbekannter Wert wirklich ein Coin ist
function isCoin(value: unknown): value is Coin {
    if (typeof value !== "object" || value === null) return false;
    const c = value as Record<string, unknown>;
    return (
        typeof c.id === "string" &&
        typeof c.symbol === "string" &&
        typeof c.name === "string" &&
        typeof c.current_price === "number" &&
        typeof c.price_change_percentage_24h === "number" &&
        typeof c.market_cap === "number"
    );
}

export async function fetchPrices(
    coinIds: string[],
    currency: Currency = "eur",
): Promise<Coin[]> {
    const params = new URLSearchParams({
        vs_currency: currency,
        ids: coinIds.join(","),
    });

    const response = await fetch(`${BASE_URL}/coins/markets?${params}`);

    if (!response.ok) {
        throw new Error(`API antwortete mit Status ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
        throw new Error("Unerwartetes Format — Array erwartet");
    }

    if (!data.every(isCoin)) {
        throw new Error("Mindestens ein Eintrag entspricht nicht dem Coin-Format");
    }

    // Ab hier: TS weiß, dass data: Coin[] ist — kein Cast nötig
    return data;
}