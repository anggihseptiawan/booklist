import { createBrowserRouter } from "react-router-dom"
import Book from "./book"
import Root from "../root"
import Home from "./home"
import ErrorPage from "../error-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "book/:id",
        element: <Book />,
      },
    ],
  },
])
