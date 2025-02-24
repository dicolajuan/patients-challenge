import { PatientRepository } from "@/infrastructure/patient/PatientRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePatientContext } from "../context";
import { CreatePatientUseCase } from "@/application/patient/useCases/CreatePatientUseCase";
import { Patient } from "@/domain/patient";
import { logger } from "@/infrastructure/logger";

const repo = new PatientRepository();
const createPatientUC = new CreatePatientUseCase(repo);
const useCreatePatient = () => {
    const queryClient = useQueryClient();
    const { showToast } = usePatientContext();

    return useMutation({
        mutationFn: async (patient: Patient) => await createPatientUC.execute(patient),
        onSuccess: (createdPatient: Patient) => {
            logger.debug('created patient', createdPatient);
            queryClient.setQueryData<Patient[]>(['patients'], (old) => {
                return old ? [...old, createdPatient] : [createdPatient];
            });
            showToast('success', 'Patient created successfully');
        },
        onError: (error) => {
            logger.error('error creating patient', error);
            showToast('error', 'Error creating patient');
        }
    })
}

export default useCreatePatient