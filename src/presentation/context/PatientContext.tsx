import { Patient } from "@/domain/patient";
import { createContext, useState, useContext, ReactNode } from "react";

export type ToastType = "success" | "error";

interface ToastProps {
    type: ToastType;
    label: string;
    show: boolean;
}

interface PatientContextProps {
    isOpenModal: boolean;
    setIsOpenModal: (isOpen: boolean) => void;
    contentModal: ReactNode | null;
    setContentModal: (content: ReactNode | null) => void;
    patient: Patient | null;
    setPatient: (patient: Patient | null) => void;
    toast: ToastProps | null;
    showToast: (type: ToastType, label: string, duration?: number) => void;
}

const PatientContext = createContext<PatientContextProps>({
    isOpenModal: false,
    setIsOpenModal: () => {},
    contentModal: null,
    setContentModal: () => {},
    patient: null,
    setPatient: () => {},
    toast: null,
    showToast: () => {},
});

export function usePatientContext() {
    const context = useContext(PatientContext);
    if (!context)
        throw new Error(
            "usePatientContext must be used within a PatientProvider"
        );
    return context;
}

export const PatientProvider = ({ children }: { children: ReactNode }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [contentModal, setContentModal] = useState<ReactNode | null>(null);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [toast, setToast] = useState<ToastProps | null>(null);

  function showToast(type: ToastType, label: string, duration = 3000) {
    setToast({ type, label, show: true });
    if (duration > 0) {
      setTimeout(() => hideToast(), duration);
    }
  }

  function hideToast() {
    setToast((prev) => (prev ? { ...prev, show: false } : null));
  }

    return (
        <PatientContext.Provider
            value={{
                isOpenModal,
                setIsOpenModal,
                contentModal,
                setContentModal,
                patient,
                setPatient,
                toast,
                showToast,
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};
