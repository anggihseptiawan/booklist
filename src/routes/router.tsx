import { createBrowserRouter } from "react-router-dom"
import Book from "./book"
import Root from "../root"
import Home from "./home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
