import { EditPatientUseCase } from '@/application/patient/useCases';
import { Patient } from '@/domain/patient';
import { PatientRepository } from '@/infrastructure/patient/PatientRepository';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePatientContext } from '../context';
import { logger } from '@/infrastructure/logger';

const repo = new PatientRepository();
const editPatientUC = new EditPatientUseCase(repo);

export function useEditPatient() {
  const queryClient = useQueryClient();
  const { showToast } = usePatientContext();

  return useMutation({
    mutationFn: async (patient: Patient) => await editPatientUC.execute(patient),
    onSuccess: (editedPatient: Patient) => {
      logger.debug('edited patient', editedPatient);
      queryClient.setQueryData<Patient[]>(['patients'], (old) => {
        return old
          ? old.map((p) => (p.id === editedPatient.id ? editedPatient : p))
          : [editedPatient];
      });
      showToast('success', 'Patient edited successfully');
    },
    onError: (error) => {
      logger.error('error editing patient', error);
      showToast('error', 'Error editing patient');
    }
  });
}