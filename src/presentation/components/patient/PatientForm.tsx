import { Patient } from "@/domain/patient";
import { usePatientContext } from "@/presentation/context";
import { useForm } from "react-hook-form";
import { Divider, Input } from "../commons";

interface PatientFormProps {
    onSubmit: (data: Patient) => void;
    onCancel: () => void;
}

const INITIAL_PATIENT: Patient = {
    id: "",
    name: "",
    avatar: "",
    description: "",
    website: "",
    createdAt: "",
};

const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})([/\w.-]*)*\/?$/i;

export const PatientForm = ({ onSubmit, onCancel }: PatientFormProps) => {
    const { patient } = usePatientContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Patient>({
        defaultValues: patient ?? INITIAL_PATIENT,
    });

    return (
        <form
            className="w-full flex flex-col gap-3 items-center"
            onSubmit={handleSubmit(onSubmit)}
            data-testid="patient-form"
        >
            <div className="w-full flex flex-col gap-5">
                <h1 className="text-2xl font-bold">
                    {patient ? "Edit Patient" : "Create Patient"}
                </h1>
            </div>
            <Divider />
            <div className="w-full flex flex-col gap-6">
                <Input
                    label="Name"
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                        },
                    })}
                    error={errors.name?.message}
                    placeholder="Joe Doe"
                />
                <Input
                    label="Avatar"
                    {...register("avatar", {
                        pattern: {
                            value: urlPattern,
                            message: "Invalid URL format",
                        },
                    })}
                    error={errors.avatar?.message}
                    placeholder="https://avatar.com/avatar.png"
                />
                <Input
                    label="Description"
                    {...register("description", {
                        required: "Description is required",
                    })}
                    error={errors.description?.message}
                    placeholder="description"
                />
                <Input
                    label="Website"
                    {...register("website", {
                        required: "URL is required",
                        pattern: {
                            value: urlPattern,
                            message: "Invalid URL format",
                        },
                    })}
                    error={errors.website?.message}
                    placeholder="https://website.com"
                />
            </div>
            <div className="w-full flex justify-end gap-2 pt-2">
                <button type="submit" className="btn" data-testid="save-button">
                    Save
                </button>
                <button
                    type="button"
                    data-testid="cancel-button"
                    className="btn bg-red-600 hover:bg-red-700 hover:border-red-700 transition-colors duration-300"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
