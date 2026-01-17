import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export function formatDateLong(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function numberToWords(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (num === 0) return 'Zero';
  
  const convertLessThanOneThousand = (n: number): string => {
    let result = '';
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    if (n > 0) {
      result += ones[n] + ' ';
    }
    return result;
  };
  
  const dollars = Math.floor(num);
  const cents = Math.round((num - dollars) * 100);
  
  let result = '';
  
  if (dollars >= 1000000) {
    result += convertLessThanOneThousand(Math.floor(dollars / 1000000)) + 'Million ';
    const remainder = dollars % 1000000;
    if (remainder >= 1000) {
      result += convertLessThanOneThousand(Math.floor(remainder / 1000)) + 'Thousand ';
      const rem2 = remainder % 1000;
      if (rem2 > 0) result += convertLessThanOneThousand(rem2);
    } else if (remainder > 0) {
      result += convertLessThanOneThousand(remainder);
    }
  } else if (dollars >= 1000) {
    result += convertLessThanOneThousand(Math.floor(dollars / 1000)) + 'Thousand ';
    const remainder = dollars % 1000;
    if (remainder > 0) result += convertLessThanOneThousand(remainder);
  } else {
    result += convertLessThanOneThousand(dollars);
  }
  
  result = result.trim();
  
  if (cents > 0) {
    result += ' & Cents ' + convertLessThanOneThousand(cents).trim();
  } else {
    result += ' & Cents Zero';
  }
  
  return result + ' Only.';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function generatePINo(type: string, index: number): string {
  const prefix = type === 'labels' ? 'FR' : type === 'fabric' ? 'MT' : 'FR';
  const year = new Date().getFullYear().toString().slice(-2);
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  return `${prefix}-${month}/${year}${type === 'fabric' ? 'SP' : ''} (${index.toString().padStart(2, '0')})`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: 'badge-neutral',
    sent: 'badge-info',
    confirmed: 'badge-success',
    cancelled: 'badge-error',
    pending: 'badge-warning',
    active: 'badge-success',
    shipped: 'badge-info',
    completed: 'badge-success',
    partial: 'badge-warning',
    closed: 'badge-neutral',
    defaulted: 'badge-error',
  };
  return colors[status] || 'badge-neutral';
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
