import { Patient } from "@/domain/patient";
import { useState } from "react";
import { PatientCard } from "./PatientCard";

interface PatientListProps {
    patients: Patient[];
}

export const PatientList = ({ patients }: PatientListProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const handleToggle = (id: string): void => {
        setExpandedId((prev: string | null) => (prev === id ? null : id));
    };
    return (
        <>
            {patients.map((patient) => (
                <PatientCard
                    key={patient.id}
                    patient={patient}
                    isExpanded={expandedId === patient.id}
                    onToggle={() => handleToggle(patient.id)}
                />
            ))}
        </>
    );
};
