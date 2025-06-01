import MainLayout from "@/layouts/MainLayout";
import Home from "@/views/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
