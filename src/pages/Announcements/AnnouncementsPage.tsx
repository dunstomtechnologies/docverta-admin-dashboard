import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AnnouncementsPage: React.FC = () => {
  const announcements = [
    {
      id: 'ANN-01',
      title: 'Scheduled System Maintenance: Telehealth Video Gateway',
      target: 'All Doctors & Patients',
      publishedAt: '08 Nov 2026',
      status: 'Active',
      description: 'Scheduled maintenance on WebRTC media relays will occur on Sunday between 02:00 AM and 04:00 AM IST.',
    },
    {
      id: 'ANN-02',
      title: 'New National Medical Commission (NMC) Digital Prescription Guidelines',
      target: 'Doctors Only',
      publishedAt: '01 Nov 2026',
      status: 'Pinned',
      description: 'All e-prescriptions generated through Docverta must include standardized generic names and digital signatures.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Broadcast Announcements</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Send global alerts, compliance advisories and maintenance notifications
            </p>
          </div>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New Announcement
          </Button>
        </div>

        <div className="mt-5 space-y-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {a.target}
                </span>
                <Badge variant={a.status === 'Pinned' ? 'purple' : 'info'} size="sm">
                  {a.status}
                </Badge>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-2">{a.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{a.description}</p>
              <span className="text-[11px] text-slate-400 mt-3 block">{a.publishedAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
