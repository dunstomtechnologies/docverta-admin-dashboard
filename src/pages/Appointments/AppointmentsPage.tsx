import React from 'react';
import { RecentAppointmentsTable } from '../../components/tables/RecentAppointmentsTable';

export const AppointmentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <RecentAppointmentsTable />
    </div>
  );
};
