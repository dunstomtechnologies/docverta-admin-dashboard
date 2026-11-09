import React from 'react';
import { Award, Users } from 'lucide-react';

export const SpecializationsPage: React.FC = () => {
  const specs = [
    { name: 'Cardiology', doctorsCount: 142, consultations: '12,400+' },
    { name: 'Neurology', doctorsCount: 88, consultations: '6,800+' },
    { name: 'Dermatology', doctorsCount: 195, consultations: '18,200+' },
    { name: 'Orthopedics', doctorsCount: 110, consultations: '9,500+' },
    { name: 'Pediatrics', doctorsCount: 165, consultations: '14,300+' },
    { name: 'Gynecology & Obstetrics', doctorsCount: 210, consultations: '20,400+' },
    { name: 'General Medicine', doctorsCount: 290, consultations: '32,100+' },
    { name: 'Psychiatry & Mental Health', doctorsCount: 75, consultations: '5,900+' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-900">Medical Specializations</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Clinical domains and specialist distribution across India
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specs.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 mb-3">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {item.doctorsCount} Doctors
                </span>
                <span className="font-semibold text-slate-700">{item.consultations}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
