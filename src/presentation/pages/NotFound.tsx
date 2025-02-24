import { logger } from "@/infrastructure/logger";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { NotFoundIcon } from "../components/icons";

export default function NotFound() {

    const navigate = useNavigate();

    useEffect(() => {
        const throwError = () => {
            try {
                throw new Error("Page not found");
            } catch (err) {
                logger.error(err);
            }
        };

        throwError();
    }, []);

    return (
        <div className="h-screen flex flex-col gap-8 items-center justify-center">
            <NotFoundIcon className="w-[200px] h-[200px]" />
            <h1 className="text-2xl font-semibold">Page not found</h1>
            <p>Go back to <span className="underlin e text-blue-400 cursor-pointer" onClick={() => navigate("/")}>Home</span></p>
        </div>
    );
}
