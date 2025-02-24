import { Patient } from "@/domain/patient";
import { useState, useMemo } from "react";

const PATIENTS_PER_PAGE = 6;

export function useVisiblePatients(patients: Patient[]) {
    const [visibleCount, setVisibleCount] = useState(PATIENTS_PER_PAGE);

    const visiblePatients = useMemo(() => {
        return patients.slice(0, visibleCount);
    }, [patients, visibleCount]);

    const hasMorePatients = visibleCount < patients.length;

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + PATIENTS_PER_PAGE, patients.length));
    };

    const reset = () => {
        setVisibleCount(PATIENTS_PER_PAGE);
    };

    return {
        visiblePatients,
        hasMorePatients,
        loadMore,
        reset,
    };
} 