import { createBrowserRouter } from "react-router-dom"
import Home from "./home"
import Book from "./book"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "book/:id",
    element: <Book />,
  },
])
