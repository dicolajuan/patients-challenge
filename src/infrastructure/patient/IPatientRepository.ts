import { Patient } from "../../domain/patient"

export interface IPatientRepository {
    getAll(): Promise<Patient[]>
} 