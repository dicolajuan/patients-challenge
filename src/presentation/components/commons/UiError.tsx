
import { logger } from "@/infrastructure/logger";
import { useEffect } from "react";
import { useRouteError } from "react-router";
import { ErrorPageIcon } from "../icons";

interface UiErrorProp {
    page: string;
}

export const UiError = ({ page }: UiErrorProp) => {
    const routerError = useRouteError();

    useEffect(() => {
        const throwError = () => {
            logger.error(`Error Page: ${page} \n`,routerError);
        };

        throwError();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center text-2xl">
            <ErrorPageIcon className="w-[200px] h-[200px]" />
            <h1 className="text-2xl font-semibold">There was an error loading the page</h1>
            <p className="italic text-sm">Please check the console before reloading</p>
        </div>
    );
};
