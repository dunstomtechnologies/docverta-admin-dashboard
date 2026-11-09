import React from 'react';
import {
  CalendarPlus,
  UserCheck,
  CheckCircle2,
  Star,
  FileCheck2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { ActivityItem, ActivityType } from '../../../types/dashboard.types';
import { formatRelativeTime } from '../../../utils/formatters';
import { Skeleton } from '../../../components/common/Skeleton';

interface Props {
  activities: ActivityItem[];
  isLoading?: boolean;
}

export const RecentActivityList: React.FC<Props> = ({ activities, isLoading }) => {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'appointment_booked':
        return <CalendarPlus className="h-4 w-4 text-blue-600" />;
      case 'doctor_registered':
        return <UserCheck className="h-4 w-4 text-purple-600" />;
      case 'appointment_completed':
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case 'new_review':
        return <Star className="h-4 w-4 text-amber-500 fill-amber-500" />;
      case 'verification_submitted':
        return <FileCheck2 className="h-4 w-4 text-indigo-600" />;
      default:
        return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  const getActivityBg = (type: ActivityType) => {
    switch (type) {
      case 'appointment_booked':
        return 'bg-blue-50 border-blue-100';
      case 'doctor_registered':
        return 'bg-purple-50 border-purple-100';
      case 'appointment_completed':
        return 'bg-emerald-50 border-emerald-100';
      case 'new_review':
        return 'bg-amber-50 border-amber-100';
      case 'verification_submitted':
        return 'bg-indigo-50 border-indigo-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="h-5 w-36 rounded bg-slate-200 mb-4 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Recent Activity</h3>
          <p className="text-xs text-slate-500 mt-0.5">Live platform operations and events</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Feed
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-3.5 group">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-sm ${getActivityBg(
                item.type
              )}`}
            >
              {getActivityIcon(item.type)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </p>
                <span className="shrink-0 text-[10px] font-medium text-slate-400">
                  {formatRelativeTime(item.timestamp)}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                {item.description}
              </p>
              {item.user && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  {item.user.avatarUrl && (
                    <img
                      src={item.user.avatarUrl}
                      alt={item.user.name}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                  )}
                  <span className="text-[11px] font-medium text-slate-500">{item.user.name}</span>
                  {item.user.role && (
                    <span className="text-[10px] text-slate-400">• {item.user.role}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-slate-100 pt-3 text-center">
        <button className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
          View Audit Logs <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
