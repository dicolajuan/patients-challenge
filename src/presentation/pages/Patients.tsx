import { PatientSortOrder, PatientSortType } from "@/domain/patient";
import { Modal } from "../components/commons";
import { NewPatientFloatingButton, PatientList } from "../components/patient";
import {
    useFetchPatients,
    usePatientSearch,
    useVisiblePatients,
} from "../hooks";

export const Patients = () => {
    const {
        data: patients,
        isLoading,
        isError,
        error,
    } = useFetchPatients(PatientSortType.CREATION_DATE, PatientSortOrder.DESC);

    const { searchTerm, setSearchTerm, filteredPatients } = usePatientSearch(
        patients ?? []
    );

    const { visiblePatients, hasMorePatients, loadMore, reset } =
        useVisiblePatients(filteredPatients ?? []);

    if (isLoading) return <p>Cargando pacientes...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    return (
        <div className="w-full h-full flex flex-col items-center max-md:justify-center md:justify-between gap-8">
            <h1 className="max-sm:!text-[2rem] md:text-[3rem]">Patient Management</h1>
            <div className="w-full max-w-md">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search patients..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            <div className="w-full flex flex-col items-center gap-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                    <PatientList
                        patients={visiblePatients}
                        data-testid="patient-list"
                    />
                </div>
                {hasMorePatients ? (
                    <button onClick={loadMore} className="btn">
                        Show more
                    </button>
                ) : (
                    <button onClick={reset} className={`btn ${searchTerm ? "hidden" : ""}`}>
                        Show less
                    </button>
                )}
            </div>
            <Modal />
            <NewPatientFloatingButton />
        </div>
    );
};
