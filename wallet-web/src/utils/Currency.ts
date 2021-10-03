export function maskCurrency(
  e: React.FormEvent<HTMLInputElement>,
): React.FormEvent<HTMLInputElement> {
  let { value } = e.currentTarget;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  e.currentTarget.value = value;
  return e;
}

export function formatToCurrency(value: string): string {
  let currentValue = value;
  currentValue = value.replace(/\D/g, '');
  currentValue = value.replace(/(\d)(\d{2})$/, '$1,$2');
  currentValue = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
  return currentValue;
}

export const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

export const toFloat = (value: string): number => {
  if (typeof value === 'number') return value;
  return Number(value.split('.').join('').split(',').join('.'));
};
