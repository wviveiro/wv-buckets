export const formatToCurrency = (num: number) =>
  num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
