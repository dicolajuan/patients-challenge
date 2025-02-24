import { CreatePatientUseCase } from "@/application/patient/useCases/CreatePatientUseCase";
import { Patient } from "@/domain/patient";
import { PatientRepository } from "@/infrastructure/patient/PatientRepository";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("CreatePatientUseCase", () => {

    const mockRepository = {
        createPatient: vi.fn((patient) => Promise.resolve(patient)),
    } as unknown as PatientRepository;

    // Instancia del caso de uso
    const useCase = new CreatePatientUseCase(mockRepository);

    // Reset de los mocks antes de cada test
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("1- Should create a patient successfully", async () => {
        const result = await useCase.execute({
            id: "1",
            name: "John Doe",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        });

        expect(result.id).toBe("1");
        expect(mockRepository.createPatient).toHaveBeenCalledOnce();
    });

    it("2- Should throw error when patient has no ID", async () => {
        const invalidPatient: Patient = {
            id: "",
            name: "John Doe",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        };

        await expect(useCase.execute(invalidPatient)).rejects.toThrow(
            "Patient must have an ID to be created"
        );
        expect(mockRepository.createPatient).not.toHaveBeenCalled();
    });
});
