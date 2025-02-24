import { Patient } from "@/domain/patient";
import { logger } from "../logger/LoggerImpl";
import { PatientRepositoryPort } from "@/application/patient/ports";

const { VITE_PATIENTS_API_URL } = import.meta.env;

const API_CONFIG = {
    BASE_URL: VITE_PATIENTS_API_URL,
    TIMEOUT: 5000,
} as const;

export class PatientRepository implements PatientRepositoryPort {
    async getAllPatients(): Promise<Patient[]> {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(
                () => controller.abort(),
                API_CONFIG.TIMEOUT
            );

            const response = await fetch(API_CONFIG.BASE_URL, {
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            logger.debug("Patients fetched successfully:", data);
            return data;
        } catch (error) {
            logger.error("Error fetching patients:", error);
            throw error;
        }
    }

    async editPatient(patient: Patient): Promise<Patient> {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                logger.debug("Patient edited successfully:", patient);
                resolve();
            }, 1500);
        });

        return patient;
    }

    async createPatient(patient: Patient): Promise<Patient> {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                logger.debug("Patient created successfully:", patient);
                resolve();
            }, 1000);
        });

        return patient;
    }
}
