const formatter = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 });

export function formatPrice(price: number): string {
  return `${formatter.format(price)} EUR`;
}
