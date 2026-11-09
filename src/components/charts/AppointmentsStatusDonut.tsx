import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AppointmentsStatusBreakdown } from '../../types/dashboard.types';
import { formatNumber } from '../../utils/formatters';

interface Props {
  data: AppointmentsStatusBreakdown[];
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: AppointmentsStatusBreakdown;
  }>;
}

const DonutTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0]?.payload;
    if (!item) return null;
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
        <p className="text-xs font-semibold text-slate-800">{item.status}</p>
        <p className="text-sm font-bold text-slate-900 mt-1">
          {formatNumber(item.count)}{' '}
          <span className="text-xs font-normal text-slate-500">({item.percentage}%)</span>
        </p>
      </div>
    );
  }
  return null;
};

export const AppointmentsStatusDonut: React.FC<Props> = ({ data, isLoading }) => {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="h-6 w-44 animate-pulse rounded bg-slate-200 mb-4" />
        <div className="h-64 w-full animate-pulse rounded-full bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Appointments by Status
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Distribution of current booking lifecycle
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            Total {formatNumber(total)}
          </span>
        </div>

        {/* Donut Chart Canvas */}
        <div className="relative mt-2 h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<DonutTooltip />} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={4}
                dataKey="count"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Total Overlay */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-slate-500">Total Consults</span>
            <span className="text-xl font-extrabold text-slate-900">
              {total > 1000 ? `${(total / 1000).toFixed(1)}k` : total}
            </span>
          </div>
        </div>
      </div>

      {/* Styled Status Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-slate-100 pt-4">
        {data.map((item) => (
          <div
            key={item.status}
            className="flex items-center justify-between rounded-lg bg-slate-50/80 px-2.5 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-slate-700">{item.status}</span>
            </div>
            <span className="text-xs font-bold text-slate-900">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
