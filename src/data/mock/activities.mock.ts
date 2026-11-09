import { ActivityItem } from '../../types/dashboard.types';

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: 'ACT-001',
    type: 'appointment_booked',
    title: 'New appointment booked',
    description: 'Rohan Sharma booked In-Clinic consultation with Dr. Priya Desai',
    timestamp: '2026-11-09T17:45:00Z',
    user: {
      name: 'Rohan Sharma',
      role: 'Patient',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'ACT-002',
    type: 'doctor_registered',
    title: 'New doctor registered',
    description: 'Dr. Vikram Malhotra (Orthopedics) registered and submitted KYC documents',
    timestamp: '2026-11-09T16:20:00Z',
    user: {
      name: 'Dr. Vikram Malhotra',
      role: 'Doctor',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'ACT-003',
    type: 'appointment_completed',
    title: 'Appointment completed',
    description: 'Dr. Meera Iyer completed pediatric video consultation with Kavita Joshi',
    timestamp: '2026-11-09T15:10:00Z',
    user: {
      name: 'Dr. Meera Iyer',
      role: 'Doctor',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'ACT-004',
    type: 'new_review',
    title: 'New 5-star review received',
    description: '"Excellent consultation, Dr. Rajesh explained the diagnosis very clearly." - Deepak Chopra',
    timestamp: '2026-11-09T13:40:00Z',
    user: {
      name: 'Deepak Chopra',
      role: 'Patient',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'ACT-005',
    type: 'verification_submitted',
    title: 'Medical license renewal submitted',
    description: 'Dr. Sunita Kulkarni updated medical council registration certificate',
    timestamp: '2026-11-09T11:05:00Z',
    user: {
      name: 'Dr. Sunita Kulkarni',
      role: 'Doctor',
      avatarUrl: 'https://images.unsplash.com/photo-1594824813633-401d4a8f9064?w=100&auto=format&fit=crop&q=80',
    },
  },
];
