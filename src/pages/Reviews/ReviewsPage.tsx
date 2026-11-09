import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const ReviewsPage: React.FC = () => {
  const reviews = [
    {
      id: 'REV-01',
      patient: 'Deepak Chopra',
      doctor: 'Dr. Rajesh Nair (Neurology)',
      rating: 5,
      comment: 'Excellent consultation, Dr. Rajesh explained the diagnosis and treatment plan very clearly without unnecessary scans.',
      date: 'Today, 1:40 PM',
      status: 'Approved',
    },
    {
      id: 'REV-02',
      patient: 'Sneha Patel',
      doctor: 'Dr. Priya Desai (Cardiology)',
      rating: 5,
      comment: 'Very polite doctor. Follow-up consultation through video call was seamless and on time.',
      date: 'Yesterday, 4:15 PM',
      status: 'Approved',
    },
    {
      id: 'REV-03',
      patient: 'Amitabh Sengupta',
      doctor: 'Dr. Sunita Kulkarni (Dermatology)',
      rating: 4,
      comment: 'Good advice and quick diagnosis. Clinic waiting time was slightly longer than expected.',
      date: '07 Nov 2026',
      status: 'Approved',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-900">Patient Reviews & Clinical Ratings</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Patient feedback moderation and clinical satisfaction tracking
        </p>

        <div className="mt-5 space-y-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-xs">{r.patient}</span>
                  <span className="text-slate-400 text-xs"> reviewed </span>
                  <span className="font-semibold text-blue-600 text-xs">{r.doctor}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < r.rating
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-600 italic">"{r.comment}"</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>{r.date}</span>
                <Badge variant="success" size="sm">
                  {r.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
