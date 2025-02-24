import { GlobeIcon, TextIcon } from "../icons";
import { Patient } from "@/domain/patient";
import { Divider } from "../commons";
import { HTMLMotionProps, motion } from "framer-motion";
import { CalendarIcon } from "../icons/CalendarIcon";

interface PatientCardDetailsProps extends HTMLMotionProps<"div"> {
    patient: Patient;
    className?: string;
}

export const PatientCardDetails = ({
    patient,
    ...props
}: PatientCardDetailsProps) => {
    const formatDate = (dateString: string): string => {
        return dateString.replace("T", " ").slice(0, 19);
    };

    return (
        <motion.div {...props}>
            <DescribeSection
                icon={<GlobeIcon className="w-6 h-6" />}
                title="Website"
                content={patient.website}
                contentClassName={
                    "w-fit text-blue-500 text-justify underline cursor-pointer"
                }
            />
            <DescribeSection
                icon={<TextIcon className="w-6 h-6" />}
                title="Description"
                content={patient.description}
                contentClassName={"text-gray-700 text-justify"}
            />
            <DescribeSection
                icon={<CalendarIcon className="w-6 h-6" />}
                title="Creation date"
                content={formatDate(patient.createdAt)}
                contentClassName={"text-gray-700 text-justify"}
            />
        </motion.div>
    );
};

const DescribeSection = ({
    icon,
    title,
    content,
    contentClassName,
}: {
    icon: React.ReactNode;
    title: string;
    content: string;
    contentClassName?: string;
}) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full flex-center gap-2 text-gray-500">
                <div className="flex-center gap-1">
                    {icon}
                    <p className="text-sm font-semibold">{title}</p>
                </div>
                <div className="flex-grow">
                    <Divider />
                </div>
            </div>
            <div className="text-sm">
                <p className={contentClassName}>{content}</p>
            </div>
        </div>
    );
};
