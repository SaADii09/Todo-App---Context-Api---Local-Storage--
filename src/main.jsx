import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import { Weather, Jokes } from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: (
                    <StrictMode>
                        <App />
                    </StrictMode>
                ),
            },
            ,
            {
                path: "/weather",
                element: <Weather />,
            },
            {
                path: "/jokes",
                element: <Jokes />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
