import { DoctorItem } from '../types/doctor.types';
import { PaginatedResponse, PaginationParams } from '../types/common.types';
import { doctorApi } from '../services/api/doctor.api';
import { MOCK_DOCTORS } from '../data/mock/doctors.mock';

const DATA_MODE = import.meta.env.VITE_DATA_MODE || 'mock';

export const doctorRepository = {
  async getDoctors(params: PaginationParams): Promise<PaginatedResponse<DoctorItem>> {
    if (DATA_MODE === 'api') {
      return await doctorApi.getDoctors(params);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    let filtered = [...MOCK_DOCTORS];

    if (params.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialization.toLowerCase().includes(q) ||
          doc.clinicHospital.toLowerCase().includes(q)
      );
    }

    const page = params.page || 1;
    const limit = params.limit || 10;
    const totalCount = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const startIndex = (page - 1) * limit;
    const data = filtered.slice(startIndex, startIndex + limit);

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  },

  async verifyDoctor(
    doctorId: string,
    action: 'approve' | 'reject',
    remarks?: string
  ): Promise<{ success: boolean; message: string }> {
    if (DATA_MODE === 'api') {
      return await doctorApi.verifyDoctor(doctorId, action, remarks);
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    const doc = MOCK_DOCTORS.find((d) => d.id === doctorId);
    if (doc) {
      doc.verificationStatus = action === 'approve' ? 'Active' : 'Rejected';
    }
    return {
      success: true,
      message: `Doctor ${action === 'approve' ? 'approved' : 'rejected'} successfully.`,
    };
  },
};
