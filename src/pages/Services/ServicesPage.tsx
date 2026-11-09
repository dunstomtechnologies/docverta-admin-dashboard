import React from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 'SRV-01',
      name: 'General Teleconsultation',
      category: 'Primary Care',
      duration: '15-20 mins',
      baseFee: '₹600',
      activeDoctors: 412,
      status: 'Active',
    },
    {
      id: 'SRV-02',
      name: 'Super-Specialist Second Opinion',
      category: 'Tertiary Care',
      duration: '30-45 mins',
      baseFee: '₹1,500',
      activeDoctors: 180,
      status: 'Active',
    },
    {
      id: 'SRV-03',
      name: 'In-Clinic Physical Consultation',
      category: 'Outpatient Care',
      duration: '20-30 mins',
      baseFee: '₹1,000',
      activeDoctors: 620,
      status: 'Active',
    },
    {
      id: 'SRV-04',
      name: 'Chronic Disease Management (Diabetes/Hypertension)',
      category: 'Preventive Care',
      duration: 'Monthly Care Plan',
      baseFee: '₹2,499',
      activeDoctors: 95,
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-900">Clinical Healthcare Services</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Consultation tiers and health packages configured across the platform
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="rounded-xl border border-slate-200 p-4 hover:border-blue-300 transition-colors bg-slate-50/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {srv.category}
                </span>
                <Badge variant="success" size="sm">
                  {srv.status}
                </Badge>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-2">{srv.name}</h4>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-200/60 pt-2.5">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" /> {srv.duration}
                </span>
                <span className="font-bold text-slate-900">{srv.baseFee}</span>
                <span className="text-slate-500">{srv.activeDoctors} Doctors</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
