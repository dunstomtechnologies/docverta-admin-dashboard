export type DoctorStatus = 'Active' | 'Pending Verification' | 'Suspended' | 'Rejected';

export interface DoctorItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  clinicHospital: string;
  medicalLicenseNumber: string;
  verificationStatus: DoctorStatus;
  rating: number;
  totalConsultations: number;
  joinedDate: string;
  avatarUrl?: string;
}
