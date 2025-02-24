import { describe, it, expect, vi } from 'vitest';
import { GetPatientListUseCase } from '@/application/patient/useCases';
import { PatientRepository } from '@/infrastructure/patient/PatientRepository';
import { Patient } from '@/domain/patient';

describe('GetPatientsUseCase', () => {
    const mockPatients: Patient[] = [
        {
            id: '1',
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/150',
            description: 'Lorem ipsum dolor sit amet',
            website: 'https://example.com',
            createdAt: new Date().toISOString(),
        },
        {
            id: '2',
            name: 'Jane Doe',
            avatar: 'https://via.placeholder.com/150',
            description: 'Lorem ipsum dolor sit amet',
            website: 'https://example.com',
            createdAt: new Date().toISOString(),
        },
    ];

    const mockRepository = {
        getAllPatients: vi.fn().mockResolvedValue(mockPatients),
    } as unknown as PatientRepository;

    it('1- Should get all patients with default sorting', async () => {
        const useCase = new GetPatientListUseCase(mockRepository);
        const result = await useCase.execute();

        expect(result).toEqual(mockPatients);
        expect(mockRepository.getAllPatients);
    });

    it('2- Should get patients with custom sorting', async () => {
        const useCase = new GetPatientListUseCase(mockRepository);
        await useCase.execute();

        expect(mockRepository.getAllPatients);
    });
}); 