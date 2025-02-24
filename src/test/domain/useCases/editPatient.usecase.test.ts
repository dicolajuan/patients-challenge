import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Patient } from '@/domain/patient';
import { PatientRepository } from '@/infrastructure/patient/PatientRepository';
import { EditPatientUseCase } from '@/application/patient/useCases';

describe('EditPatientUseCase', () => {

    const mockRepository = {
        editPatient: vi.fn((patient) => Promise.resolve(patient)),
    } as unknown as PatientRepository;

    const useCase = new EditPatientUseCase(mockRepository);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockPatient: Patient = {
        id: '1',
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
        description: 'Lorem ipsum dolor sit amet',
        website: 'https://example.com',
        createdAt: new Date().toISOString(),
    };

    it('1- Should edit a patient successfully', async () => {
        const updatedPatient = { ...mockPatient, name: 'John Updated' };
        
        const result = await useCase.execute(updatedPatient);
        expect(result).toEqual(updatedPatient);
        expect(mockRepository.editPatient).toHaveBeenCalledWith(updatedPatient);
    });

    it('2- Should throw error when patient has no ID', async () => {
        const invalidPatient: Patient = {
            id: "",
            name: "John Doe",
            avatar: "https://via.placeholder.com/150",
            description: "Lorem ipsum dolor sit amet",
            website: "https://example.com",
            createdAt: new Date().toISOString(),
        };

        await expect(useCase.execute(invalidPatient)).rejects.toThrow(
            "Patient must have an ID to be edited"  
        );
        expect(mockRepository.editPatient).not.toHaveBeenCalled();
    });
}); 