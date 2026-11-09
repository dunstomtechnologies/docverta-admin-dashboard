import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Reports & Analytics</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Financial settlements, platform volume trends and clinical metrics
            </p>
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export Monthly Report
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500">Gross Platform Value (GPV)</span>
            <p className="text-xl font-bold text-slate-900 mt-1">₹48,25,000</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">+18.7% vs last month</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500">Doctor Settlements</span>
            <p className="text-xl font-bold text-slate-900 mt-1">₹39,56,500</p>
            <p className="text-[11px] text-slate-400 mt-1">82% payout ratio</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500">Net Platform Commission</span>
            <p className="text-xl font-bold text-slate-900 mt-1">₹8,68,500</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">+14.2% margin</p>
          </div>
        </div>
      </div>
    </div>
  );
};
