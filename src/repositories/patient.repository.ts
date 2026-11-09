import { PatientItem } from '../types/patient.types';
import { PaginatedResponse, PaginationParams } from '../types/common.types';
import { patientApi } from '../services/api/patient.api';
import { MOCK_PATIENTS } from '../data/mock/patients.mock';

const DATA_MODE = import.meta.env.VITE_DATA_MODE || 'mock';

export const patientRepository = {
  async getPatients(params: PaginationParams): Promise<PaginatedResponse<PatientItem>> {
    if (DATA_MODE === 'api') {
      return await patientApi.getPatients(params);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    let filtered = [...MOCK_PATIENTS];

    if (params.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      filtered = filtered.filter(
        (pat) =>
          pat.name.toLowerCase().includes(q) ||
          pat.email.toLowerCase().includes(q) ||
          pat.city.toLowerCase().includes(q)
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

  async getPatientById(id: string): Promise<PatientItem> {
    if (DATA_MODE === 'api') {
      return await patientApi.getPatientById(id);
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
    const found = MOCK_PATIENTS.find((p) => p.id === id);
    if (!found) {
      throw new Error(`Patient with ID ${id} not found.`);
    }
    return found;
  },
};
