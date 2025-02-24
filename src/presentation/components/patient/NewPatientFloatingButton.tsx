import { usePatientContext } from "@/presentation/context";
import { NewUserIcon } from "../icons/NewUserIcon";
import { logger } from "@/infrastructure/logger";
import { Patient, PatientSortOrder, PatientSortType } from "@/domain/patient";
import { PatientForm } from "./PatientForm";
import { useFetchPatients } from "@/presentation/hooks";
import useCreatePatient from "@/presentation/hooks/useCreatePatient";

export const NewPatientFloatingButton = () => {
    const { setIsOpenModal, setContentModal, setPatient } = usePatientContext();
    const { data: patients } = useFetchPatients(PatientSortType.CREATION_DATE, PatientSortOrder.DESC);
    
    const { mutate: createPatient } = useCreatePatient();

    const handleCreatePatient = async (patient: Patient) => {
        logger.debug("create patient", patient);
        const maxID = Math.max(...patients?.map(p => +p.id) ?? []);
        const newPatient = {
            ...patient,
            id: (maxID + 1).toString(),
            createdAt: new Date().toISOString(),
        };
        await createPatient(newPatient);
        setIsOpenModal(false);
        setContentModal(null);
        setPatient(null);
    }

    const handleCancel = () => {
        setIsOpenModal(false);
        setPatient(null);
    };

    const handleFloatingButtonClick = () => {
        setIsOpenModal(true);
        setContentModal(
            <>
                <PatientForm
                    onSubmit={handleCreatePatient}
                    onCancel={handleCancel}
                />
            </>
        );
    };

    return (
        <button
            className="fixed w-16 h-16 max-xs:bg-red-600 items-center justify-center bottom-4 right-4 bg-primary active:bg-primary/80 hover:bg-primary/80 cursor-pointer active:scale-95 select-none text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300"
            onClick={handleFloatingButtonClick}
            data-testid="floating-button"
        >
            <NewUserIcon className="w-8 h-7 stroke-[4]" />
        </button>
    );
};
