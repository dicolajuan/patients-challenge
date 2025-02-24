import { GetPatientListUseCase } from "@/application/patient/useCases";
import { Patient, PatientSortingService, PatientSortOrder, PatientSortType } from "@/domain/patient";
import { PatientRepository } from "@/infrastructure/patient/PatientRepository";
import { useQuery } from "@tanstack/react-query";

const repo = new PatientRepository();
const getPatientListUC = new GetPatientListUseCase(repo);

export function useFetchPatients(sortType: PatientSortType, sortOrder: PatientSortOrder) {
  return useQuery<Patient[], Error>({
    queryKey: ['patients'],
    queryFn: () => getPatientListUC.execute(),
    staleTime: 5000 * 60, 
    retry: 2,
    select: (data) => PatientSortingService.sort(data, sortType, sortOrder),
  });
}