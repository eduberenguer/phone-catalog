const formatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  useGrouping: false,
});

export function formatPrice(price: number): string {
  return `${formatter.format(price)} EUR`;
}
