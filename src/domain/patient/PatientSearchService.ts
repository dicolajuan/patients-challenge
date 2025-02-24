import Fuse from 'fuse.js';
import { Patient } from './patient.entity';

export class PatientSearchService {
    private static fuseOptions = {
        keys: ['name', 'lastName'],
        threshold: 0.3
    };

    public static search(patients: Patient[], searchTerm: string): Patient[] {
        if (!searchTerm) return patients;
        
        const fuse = new Fuse(patients, this.fuseOptions);
        return fuse.search(searchTerm).map(result => result.item);
    }
} 