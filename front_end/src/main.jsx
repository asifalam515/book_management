import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./components/Books.jsx";
import Update from "./components/Update.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/books",
    element: <Books></Books>,
    loader: () => fetch("http://localhost:3000/books"),
  },
  {
    path: "/update/:id",
    element: <Update></Update>,
    loader: ({ params }) => fetch(`http://localhost:3000/books/${params.id}`),
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
