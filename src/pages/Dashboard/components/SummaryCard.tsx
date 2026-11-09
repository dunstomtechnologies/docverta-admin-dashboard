import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface SummaryCardProps {
  title: string;
  value: string;
  growth: number;
  comparisonText: string;
  icon: React.ComponentType<{ className?: string }>;
  theme: 'blue' | 'green' | 'purple' | 'amber';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  growth,
  comparisonText,
  icon: Icon,
  theme,
}) => {
  const themeStyles = {
    blue: {
      cardBg: 'bg-[#F0F7FF] border-[#DCEBFF]',
      iconBg: 'bg-[#2563EB] text-white shadow-blue-500/20',
      badgeBg: 'text-blue-700 bg-blue-100/80',
    },
    green: {
      cardBg: 'bg-[#F0FDF4] border-[#DCFCE7]',
      iconBg: 'bg-[#16A34A] text-white shadow-emerald-500/20',
      badgeBg: 'text-emerald-700 bg-emerald-100/80',
    },
    purple: {
      cardBg: 'bg-[#FAF5FF] border-[#F3E8FF]',
      iconBg: 'bg-[#9333EA] text-white shadow-purple-500/20',
      badgeBg: 'text-purple-700 bg-purple-100/80',
    },
    amber: {
      cardBg: 'bg-[#FFFBEB] border-[#FEF3C7]',
      iconBg: 'bg-[#D97706] text-white shadow-amber-500/20',
      badgeBg: 'text-amber-800 bg-amber-100/80',
    },
  };

  const currentTheme = themeStyles[theme];
  const isPositive = growth > 0;
  const isNeutral = growth === 0;

  return (
    <div
      className={cn(
        'relative rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md',
        currentTheme.cardBg
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-600">{title}</span>
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl shadow-md',
            currentTheme.iconBg
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {value}
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs">
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-bold',
              isPositive
                ? 'bg-emerald-100 text-emerald-700'
                : isNeutral
                ? 'bg-slate-100 text-slate-600'
                : 'bg-rose-100 text-rose-700'
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : isNeutral ? (
              <Minus className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {growth > 0 ? `+${growth}%` : `${growth}%`}
          </span>
          <span className="text-slate-500 font-medium">{comparisonText}</span>
        </div>
      </div>
    </div>
  );
};
