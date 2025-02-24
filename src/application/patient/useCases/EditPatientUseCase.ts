import { Patient } from "@/domain/patient";
import { PatientRepositoryPort } from "../ports";

export class EditPatientUseCase {
    constructor(private readonly repo: PatientRepositoryPort) {}

    async execute(patient: Patient): Promise<Patient> {
        if (!patient.id) {
            throw new Error("Patient must have an ID to be edited");
        }

        return this.repo.editPatient(patient);
    }
}
