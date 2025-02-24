import { Divider } from "../commons";

export const PatientCardDetailsSuspense = () => {
    return (
        <div className="w-full flex-col gap-5 shadow-md rounded-xl p-4 border border-gray-200">
            <div className="flex flex-col gap-5 animate-pulse">
                <div className="flex items-center gap-2">
                    <div className="size-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 rounded bg-gray-200"></div>
                    </div>
                </div>
                <DescribeSectionURLFallback />
                <DescribeSectionTextFallback />
                <DescribeSectionURLFallback />
            </div>
        </div>
    );
};

const DescribeSectionURLFallback = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center gap-2 text-gray-500">
                <div className="w-1/3 flex items-center gap-2">
                    <div className="w-6 h-5 rounded-full bg-gray-200"></div>
                    <div className="w-full h-2 rounded bg-gray-200"></div>
                </div>
                <div className="flex-grow">
                    <Divider />
                </div>
            </div>
            <div className="text-sm">
                <div className="h-2 rounded bg-gray-200"></div>
            </div>
        </div>
    );
};

const DescribeSectionTextFallback = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center gap-2 text-gray-500">
                <div className="w-1/3 flex items-center gap-2">
                    <div className="w-6 h-5 rounded-full bg-gray-200"></div>
                    <div className="w-full h-2 rounded bg-gray-200"></div>
                </div>
                <div className="flex-grow">
                    <Divider />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="h-2 rounded bg-gray-200"></div>
                <div className="h-2 rounded bg-gray-200"></div>
                <div className="h-2 rounded bg-gray-200"></div>
                <div className="h-2 rounded bg-gray-200"></div>
            </div>
        </div>
    );
};
