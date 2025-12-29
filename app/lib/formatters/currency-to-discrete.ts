const currencyToDiscrete = {
  usd: (amount: number): number => Math.round(amount * 100),
} as const;

export default currencyToDiscrete;
