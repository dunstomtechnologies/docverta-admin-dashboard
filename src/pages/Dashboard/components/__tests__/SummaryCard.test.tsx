import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SummaryCard } from '../SummaryCard';
import { Users } from 'lucide-react';

describe('SummaryCard Component', () => {
  it('renders title, value and growth indicator correctly', () => {
    render(
      <SummaryCard
        title="Total Patients"
        value="18,420"
        growth={14.2}
        comparisonText="from last month"
        icon={Users}
        theme="blue"
      />
    );

    expect(screen.getByText('Total Patients')).toBeInTheDocument();
    expect(screen.getByText('18,420')).toBeInTheDocument();
    expect(screen.getByText('+14.2%')).toBeInTheDocument();
    expect(screen.getByText('from last month')).toBeInTheDocument();
  });
});
