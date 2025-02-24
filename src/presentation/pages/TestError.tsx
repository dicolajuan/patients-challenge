import { logger } from "@/infrastructure/logger";

export default function TestError() {
    const throwError = () => {
        try {
            throw new Error("Test for logger error");
        } catch (err) {
            logger.error(err);
        }
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-full">
            <h1>This is a test error page</h1>
            <p>After clicking the button, check the console for the error</p>
            <button className="btn active:scale-105 transition-all duration-300" onClick={throwError}>Test Error</button>
        </div>
    );
}
