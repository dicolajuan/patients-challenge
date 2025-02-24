import { Patient, PatientSortingService, PatientSortOrder, PatientSortType } from '@/domain/patient';
import { describe, it, expect } from 'vitest';

describe('PatientSortingService', () => {
    const mockPatients: Patient[] = [
        {
            id: '1',
            name: 'Carlos Smith',
            avatar: 'avatar1.jpg',
            description: 'description 1',
            website: 'website1.com',
            createdAt: '2024-03-10T10:00:00Z'
        },
        {
            id: '2',
            name: 'Ana Johnson',
            avatar: 'avatar2.jpg',
            description: 'description 2',
            website: 'website2.com',
            createdAt: '2024-03-15T10:00:00Z'
        },
        {
            id: '3',
            name: 'Bob Wilson',
            avatar: 'avatar3.jpg',
            description: 'description 3',
            website: 'website3.com',
            createdAt: '2024-03-05T10:00:00Z'
        }
    ];

    describe('1- Sort by creation date', () => {
        it('1- Should sort patients by creation date in ascending order', () => {
            const result = PatientSortingService.sort(
                mockPatients,
                PatientSortType.CREATION_DATE,
                PatientSortOrder.ASC
            );

            expect(result[0].id).toBe('3');
            expect(result[1].id).toBe('1');
            expect(result[2].id).toBe('2');
        });

        it('2- Should sort patients by creation date in descending order', () => {
            const result = PatientSortingService.sort(
                mockPatients,
                PatientSortType.CREATION_DATE,
                PatientSortOrder.DESC
            );

            expect(result[0].id).toBe('2');
            expect(result[1].id).toBe('1');
            expect(result[2].id).toBe('3');
        });
    });

    describe('2- Sort by name', () => {
        it('1- Should sort patients by name alphabetically', () => {
            const result = PatientSortingService.sort(
                mockPatients,
                PatientSortType.NAME,
                PatientSortOrder.ASC
            );

            expect(result[0].name).toBe('Ana Johnson');
            expect(result[1].name).toBe('Bob Wilson');
            expect(result[2].name).toBe('Carlos Smith');
        });
    });

    describe('3- Invalid sort type', () => {
        it('1- Should return original array when sort type is not recognized', () => {
            const result = PatientSortingService.sort(
                mockPatients,
                'INVALID_SORT' as PatientSortType,
                PatientSortOrder.ASC
            );

            expect(result).toEqual(mockPatients);
        });
    });

    describe('4- Empty array', () => {
        it('1- Should handle empty array correctly', () => {
            const result = PatientSortingService.sort(
                [],
                PatientSortType.NAME,
                PatientSortOrder.ASC
            );

            expect(result).toEqual([]);
        });
    });
});