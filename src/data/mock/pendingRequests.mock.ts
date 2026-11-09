import { PendingRequestItem } from '../../types/dashboard.types';

export const MOCK_PENDING_REQUESTS: PendingRequestItem[] = [
  {
    id: 'REQ-501',
    type: 'doctor_verification',
    doctorName: 'Dr. Harshvardhan Patel',
    specialization: 'Cardiology (DM)',
    licenseNumber: 'MCI-2015-88392',
    submittedAt: '2026-11-09T08:30:00Z',
    documentsCount: 4,
    priority: 'high',
    actionUrl: '/doctor-verification?id=REQ-501',
  },
  {
    id: 'REQ-502',
    type: 'document_review',
    doctorName: 'Dr. Neha Singhania',
    specialization: 'Gynecology (MD, DNB)',
    licenseNumber: 'DMC-2018-44219',
    submittedAt: '2026-11-08T18:15:00Z',
    documentsCount: 3,
    priority: 'medium',
    actionUrl: '/doctor-verification?id=REQ-502',
  },
  {
    id: 'REQ-503',
    type: 'license_update',
    doctorName: 'Dr. Alok Verma',
    specialization: 'General Surgery (MS)',
    licenseNumber: 'UPMC-2012-10944',
    submittedAt: '2026-11-08T14:40:00Z',
    documentsCount: 2,
    priority: 'low',
    actionUrl: '/doctor-verification?id=REQ-503',
  },
];
