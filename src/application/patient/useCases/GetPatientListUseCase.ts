import { Patient } from "@/domain/patient";
import { PatientRepositoryPort } from "../ports";

export class GetPatientListUseCase {
    constructor(private readonly repo: PatientRepositoryPort) {}

    async execute(): Promise<Patient[]> {
        return this.repo.getAllPatients();
    }
}
