export interface PatientItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  bloodGroup: string;
  city: string;
  totalAppointments: number;
  registeredDate: string;
  maskedAadhaar: string; // Protected field (always masked)
  familyMembersCount: number;
  avatarUrl?: string;
}
