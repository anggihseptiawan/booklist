import { useLocation } from "react-router-dom"
import { Book } from "../types/book"

export default function Book() {
  const { state }: { state: Book } = useLocation()

  return (
    <div>
      <h1>Book detail</h1>
      <p>{state.volumeInfo.title}</p>
    </div>
  )
}
