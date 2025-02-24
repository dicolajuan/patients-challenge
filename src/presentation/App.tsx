import { Patients } from "./pages/Patients";
import { PatientProvider } from "./context/PatientContext";
import { GlobalToast, UiError } from "./components/commons";
import { createBrowserRouter, RouterProvider } from "react-router";
import { TestError } from "./pages";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PatientProvider>
                <Patients />
                <GlobalToast />
            </PatientProvider>
        ),
        errorElement: <UiError page={"Phrases"} />,
    },
    {
        path: "/test-error",
        element: <TestError />,
        errorElement: <UiError page={"Test Error"} />,
    },
    {
        path: "*",
        element: <NotFound />,
        errorElement: <UiError page={"404 Not Found"} />,
    },
]);

function App() {
    return (
        <div className="main-container">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
