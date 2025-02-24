import { usePatientContext } from "@/presentation/context";
import { motion, AnimatePresence } from "framer-motion";
import { ErrorIcon, SuccessIcon } from "../icons";

// Configuras un color o estilo según el tipo
const typeStyles = {
    success: "bg-success",
    error: "bg-error text-white",
};

export const GlobalToast = () => {
    const { toast } = usePatientContext();

    return (
        <div className="fixed top-4 right-4 z-50">
            <AnimatePresence>
                {toast && toast.show && (
                    <motion.div
                        key="global-toast"
                        
                        className={`px-4 py-2 rounded shadow-lg mb-2 flex items-center gap-2 ${
                            typeStyles[toast.type]
                        }`}
                        
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 200, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {toast.type === "success" ? (
                            <SuccessIcon className="w-7 h-7 " />
                        ) : (
                            <ErrorIcon className="w-7 h-7" />
                        )}
                        <p className="font-bold">{toast.label}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
