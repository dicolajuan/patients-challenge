import { Patient } from "@/domain/patient";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, Tooltip } from "../commons";
import { PatientCardDetails } from "./PatientCardDetails";
import { usePatientContext } from "@/presentation/context/PatientContext";
import { PatientForm } from "./PatientForm";
import { useEditPatient } from "@/presentation/hooks";
import { EditIcon } from "../icons/EditIcon";
import { PatientCardDetailsSuspense } from "./PatientCardDetailsSuspense";

interface PatientCardProps {
    patient: Patient;
    isExpanded: boolean;
    onToggle: () => void;
}

export const PatientCard = ({
    patient,
    isExpanded,
    onToggle,
}: PatientCardProps) => {
    const { setIsOpenModal, setContentModal, setPatient } = usePatientContext();

    const { mutate: editPatient, isPending } = useEditPatient();

    const handleEditPatient = async (patient: Patient) => {
        await editPatient(patient);
        setIsOpenModal(false);
        setPatient(null);
        setContentModal(null);
    };

    const handleCancel = () => {
        setIsOpenModal(false);
        setPatient(null);
    };

    const handleOpenModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setPatient(patient);
        setIsOpenModal(true);
        setContentModal(
            <>
                <PatientForm
                    onSubmit={handleEditPatient}
                    onCancel={handleCancel}
                />
            </>
        );
    };

    if (isPending) {
        return <PatientCardDetailsSuspense />;
    }

    return (
        <motion.div
            key={patient.id}
            data-testid={`patient-card-${patient.id}`}
            className={`w-full min-w-[300px] max-sm:flex-center min-md:justify-start flex-col gap-2 shadow-md rounded-xl p-4 border border-gray-200 ${
                isExpanded ? "min-md:hover:scale-102" : "hover:scale-102"
            }`}
            onClick={onToggle}
        >
            <div className="w-full flex-center gap-2 justify-between">
                <div className="flex-center gap-2">
                    <Avatar
                        url={patient.avatar}
                        alt={patient.name}
                        className="avatar-sm select-none"
                        size="sm"
                    />
                    <h2 className="capitalize font-bold text-light">
                        {patient.name}
                    </h2>
                </div>
                <div
                    className={`text-primary rounded mb-[-10px] py-2 ${
                        !isExpanded ? "max-md:hidden" : ""
                    }`}
                    onClick={handleOpenModal}
                >
                    <Tooltip text="Edit">
                        <EditIcon className="w-7 h-7 cursor-pointer" data-testid={`edit-icon-${patient.id}`} />
                    </Tooltip>
                </div>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <PatientCardDetails
                        patient={patient}
                        className="md:hidden w-full flex flex-col  gap-5"
                        key="details"
                        data-testid={`patient-card-details-${patient.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.7 }}
                        style={{ overflow: "hidden" }}
                    />
                )}
            </AnimatePresence>
            <PatientCardDetails
                patient={patient}
                className="max-md:hidden md:flex w-full flex-col gap-5"
                data-testid={`patient-card-details-${patient.id}`}
                style={{ overflow: "hidden" }}
            />
        </motion.div>
    );
};
