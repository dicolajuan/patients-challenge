import { Patient } from '@/domain/patient';
import { describe, it, expect } from 'vitest';

describe('Patient Entity', () => {
    it('1- Should create a valid patient', () => {
        const patient: Patient = {
            id: '1',
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/150',
            description: 'Lorem ipsum dolor sit amet',
            website: 'https://example.com',
            createdAt: new Date().toISOString(),
            
        };

        expect(patient.id).toBe('1');
        expect(patient.name).toBe('John Doe');
    });
}); 