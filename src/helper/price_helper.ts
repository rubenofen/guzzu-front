export function price_helper(price: number): string {
  const options = { style: 'currency', currency: 'EUR' }
  const numberFormat = new Intl.NumberFormat('es-ES', options).resolvedOptions().maximumFractionDigits
  if (price <= 0) return 'FREE'
  return price.toLocaleString('es-ES', {
    maximumFractionDigits: numberFormat,
  })
}

export function cripto_price_helper(price: number): string {
  if (price <= 0) return 'FREE'
  return price.toLocaleString('es-ES', {
    maximumFractionDigits: 4,
  })
}
