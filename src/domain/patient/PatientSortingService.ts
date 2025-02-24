import { Patient } from "./patient.entity";
import { PatientSortType, PatientSortOrder } from "./PatientSortType";

export class PatientSortingService {
    static sort(
        patients: Patient[],
        sortType: PatientSortType,
        sortOrder: PatientSortOrder
    ): Patient[] {
        if (sortType === PatientSortType.CREATION_DATE) {
            return [...patients].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return sortOrder === PatientSortOrder.ASC
                    ? dateA.getTime() - dateB.getTime()
                    : dateB.getTime() - dateA.getTime();
            });
        } else if (sortType === PatientSortType.NAME) {
            return [...patients].sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                return sortOrder === PatientSortOrder.ASC
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            });
        }
        return patients;
    }
}
