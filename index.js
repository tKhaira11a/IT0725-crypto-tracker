const COINS = ["bitcoin", "ethereum", "solana"];
const CURRENCIES = ["eur", "usd"];

function buildUrl(coins, currencies) {
    const params = new URLSearchParams({
        ids: coins.join(","),
        vs_currencies: currencies.join(","),
    });
    return `https://api.coingecko.com/api/v3/simple/price?${params}`;
}

function formatCurrency(amount, currency) {
    const locales = { eur: "de-DE", usd: "en-US" };
    return new Intl.NumberFormat(locales[currency] || "en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
    }).format(amount);
}

async function main() {
    try {
        const url = buildUrl(COINS, CURRENCIES);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API antwortete mit Status ${response.status}`);
        }

        const data = await response.json();

        // data: { bitcoin: { eur: 56234.12, usd: 60123.45 }, ethereum: {...}, ... }
        for (const coin of COINS) {
            const prices = data[coin];
            if (!prices) {
                console.log(`${coin}: keine Daten`);
                continue;
            }

            const parts = CURRENCIES.map((c) => formatCurrency(prices[c], c));
            console.log(`${coin}:`, parts.join("  /  "));
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Preise:", error.message);
        process.exit(1);
    }
}

main();