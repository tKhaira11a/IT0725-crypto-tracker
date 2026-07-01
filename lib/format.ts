// src/lib/format.ts
// Formatierungs-Helfer

export function formatEur(amount: number): string {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(amount);
}

export function formatPercent(value: number): string {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)} %`;
}