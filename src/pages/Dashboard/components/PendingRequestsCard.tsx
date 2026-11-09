import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { PendingRequestItem } from '../../../types/dashboard.types';
import { Badge } from '../../../components/common/Badge';
import { formatRelativeTime } from '../../../utils/formatters';
import { Skeleton } from '../../../components/common/Skeleton';

interface Props {
  requests: PendingRequestItem[];
  isLoading?: boolean;
}

export const PendingRequestsCard: React.FC<Props> = ({ requests, isLoading }) => {
  const navigate = useNavigate();

  const getPriorityBadge = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return (
          <Badge variant="danger" size="sm">
            <AlertTriangle className="h-3 w-3 mr-0.5" /> High Priority
          </Badge>
        );
      case 'medium':
        return <Badge variant="warning" size="sm">Medium</Badge>;
      case 'low':
      default:
        return <Badge variant="neutral" size="sm">Low</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="h-5 w-40 rounded bg-slate-200 mb-4 animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Pending Requests
            </h3>
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
              {requests.length} Action Needed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Doctor verification, KYC & medical council compliance
          </p>
        </div>
        <button
          onClick={() => navigate('/doctor-verification')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          View All <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {requests.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 hover:bg-slate-50 hover:border-slate-200 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-700">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-900">{item.doctorName}</span>
                  {getPriorityBadge(item.priority)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{item.specialization}</p>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-400">
                  <span>License: <strong className="text-slate-600">{item.licenseNumber}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" /> {item.documentsCount} documents
                  </span>
                  <span>•</span>
                  <span>{formatRelativeTime(item.submittedAt)}</span>
                </div>
              </div>
            </div>

            <div className="sm:self-center">
              <button
                onClick={() => navigate(item.actionUrl)}
                className="w-full sm:w-auto rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                Review & Verify
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
