import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercentage } from '../formatters';

describe('Formatters Utility', () => {
  it('should format currency in Indian Rupees format', () => {
    const formatted = formatCurrency(4825000);
    expect(formatted).toContain('48,25,000');
  });

  it('should format percentages with signs', () => {
    expect(formatPercentage(14.2)).toBe('+14.2%');
    expect(formatPercentage(-3.5)).toBe('-3.5%');
  });
});
