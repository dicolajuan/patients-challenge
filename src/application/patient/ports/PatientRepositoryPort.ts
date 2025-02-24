import { Patient } from "@/domain/patient";

export interface    PatientRepositoryPort {
    getAllPatients(): Promise<Patient[]>;
    editPatient(patient: Patient): Promise<Patient>;
    createPatient(patient: Patient): Promise<Patient>;
}
