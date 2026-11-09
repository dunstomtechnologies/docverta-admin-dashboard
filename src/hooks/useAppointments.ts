import { useQuery } from '@tanstack/react-query';
import { appointmentRepository } from '../repositories/appointment.repository';
import { AppointmentFilterParams } from '../types/appointment.types';

export function useAppointments(params: AppointmentFilterParams) {
  return useQuery({
    queryKey: ['appointments', params],
    queryFn: () => appointmentRepository.getAppointments(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
  });
}

export function useAppointmentDetails(id: string | null) {
  return useQuery({
    queryKey: ['appointment', id],
    queryFn: () => (id ? appointmentRepository.getAppointmentById(id) : null),
    enabled: !!id,
  });
}
