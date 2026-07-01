import { fetchPrices } from "./lib/api.js";
import { formatEur, formatPercent } from "./lib/format.js";

const COINS = ["bitcoin", "ethereum", "solana", "cardano", "dogecoin"];

async function main(): Promise<void> {
    try {
        const coins = await fetchPrices(COINS);

        for (const coin of coins) {
            const name = coin.name.padEnd(12);
            const price = formatEur(coin.current_price).padStart(15);
            const change = formatPercent(coin.price_change_percentage_24h);
            console.log(`${name} ${price}   ${change}`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Fehler:", error.message);
        } else {
            console.error("Unbekannter Fehler:", error);
        }
        process.exit(1);
    }
}

main();