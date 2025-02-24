import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { usePatientContext } from "@/presentation/context/PatientContext";

export const Modal = () => {
    const { isOpenModal, setIsOpenModal, contentModal } = usePatientContext();

    return (
        <Dialog
            open={isOpenModal}
            onClose={setIsOpenModal}
            className="relative z-10"
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-300 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center">
                    <DialogPanel
                        transition
                        className="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-300 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 p-6"
                    >
                        {contentModal}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};
