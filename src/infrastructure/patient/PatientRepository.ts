import { Patient } from "@/domain/patient"
import { logger } from "../logger/LoggerImpl"
import { IPatientRepository } from "./IPatientRepository"

const { VITE_PATIENTS_API_URL } = import.meta.env

const API_CONFIG = {
    BASE_URL: "https://api.json-generator.com/templates/z_L2iVaKRHDJ/data",
    TIMEOUT: 5000, // 5 segundos de timeout
    CACHE_TIME: 5 * 60 * 1000, // 5 minutos de cache
  } as const;

export class PatientRepository implements IPatientRepository {
    private readonly baseUrl = VITE_PATIENTS_API_URL

    async getAll(): Promise<Patient[]> {
        try {

            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

            const response = await fetch(this.baseUrl, {
                signal: controller.signal
            })
            clearTimeout(timeoutId)

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
            const data = await response.json()
            logger.debug('Patients fetched successfully:', data)
            return data;
        } catch (error) {
            logger.error('Error fetching patients:', error)
            throw error
        }
    }
} 