import { useQuery } from '@tanstack/react-query';
import { patientRepository } from '../repositories/patient.repository';
import { PaginationParams } from '../types/common.types';

export function usePatients(params: PaginationParams) {
  return useQuery({
    queryKey: ['patients', params],
    queryFn: () => patientRepository.getPatients(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePatientDetails(id: string | null) {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => (id ? patientRepository.getPatientById(id) : null),
    enabled: !!id,
  });
}
