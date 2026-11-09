import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorRepository } from '../repositories/doctor.repository';
import { PaginationParams } from '../types/common.types';

export function useDoctors(params: PaginationParams) {
  return useQuery({
    queryKey: ['doctors', params],
    queryFn: () => doctorRepository.getDoctors(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}

export function useVerifyDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      action,
      remarks,
    }: {
      doctorId: string;
      action: 'approve' | 'reject';
      remarks?: string;
    }) => doctorRepository.verifyDoctor(doctorId, action, remarks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
