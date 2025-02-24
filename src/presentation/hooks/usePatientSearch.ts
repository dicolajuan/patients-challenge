import { useState, useMemo } from 'react';
import { Patient, PatientSearchService } from '@/domain/patient';

export function usePatientSearch(patients: Patient[]) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = useMemo(() => {
        return PatientSearchService.search(patients, searchTerm);
    }, [patients, searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        filteredPatients
    };
} 