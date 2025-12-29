const discreteToCurrency = {
  usd: (amount: number): number => Number((amount / 100).toFixed(2)),
} as const;

export default discreteToCurrency;
