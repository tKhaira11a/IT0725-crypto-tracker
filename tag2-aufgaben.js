const coinData = {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    current_price: 56234.12,
    market_cap: 1100000000000,
    price_change_percentage_24h: 2.3,
    ath: 73000,
    ath_date: "2024-03-14T00:00:00Z"
};

// Aufgabe 1
//const { name, current_price, price_change_percentage_24h } = coinData;

//const { name, current_price: preis, price_change_percentage_24h: aenderung24h } = coinData;

//const { name, current_price: preis, price_change_percentage_24h: aenderung24h = 0 } = coinData;

const { name, ...rest } = coinData;


// Aufgabe 2

const defaults = { currency: "eur", language: "de", maxRetries: 3 };
const userConfig = { language: "en", maxRetries: 5 };

const config = { ...defaults, ...userConfig };

function average(...numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

const user = {
    email: "bitcoin@coinbase.coin",
    name: "Bitcoin",
    symbol: "$$$",
    current_price: 3.99,
}
function withoutEmail(user) {
    const { email, ...rest } = user;
    return rest;
}

const coins =
    [
        { name: "Bitcoin", price: 56234.12, change24h: 2.3 },
        { name: "Ethereum", price: 3120.50, change24h: -1.1 },
        { name: "Solana", price: 145.30, change24h: 5.6 },
        { name: "Cardano", price: 0.41, change24h: -0.5 },
        { name: "Dogecoin", price: 0.12, change24h: 8.2 },
    ];

const names = coins.map(c => c.name);

const gainers = coins.filter(c => c.change24h > 0);

const RATE = 1.08;
const withUsd = coins.map(c => ({ ...c, priceUsd: c.price * RATE }));
// { ...c, priceUsd: ... } erzeugt ein neues Objekt. Direkte Zuweisung c.priceUsd = ... würde mutieren.

const totalPrice = coins.reduce((sum, c) => sum + c.price, 0);

const mostExpensive = coins.reduce((max, c) => c.price > max.price ? c : max);
//Alternativ
const maxPrice = Math.max(...coins.map(c => c.price));
const mostExpensiveAlt = coins.find(c => c.price === maxPrice);





const formatted = [...coins] // Kopie für sort()
.sort((a, b) => b.change24h - a.change24h) // absteigend
.map(c => `${c.name}: ${c.change24h}%`);

