import { useLocation } from "react-router-dom"
import { Book } from "../types/book"

export default function Book() {
  const { state }: { state: Book } = useLocation()

  return (
    <div>
      <div className="flex gap-4">
        <div className="w-1/4">
          <img
            src={
              state.volumeInfo.imageLinks.thumbnail ??
              state.volumeInfo.imageLinks.smallThumbnail
            }
            className="w-full"
            alt={state.volumeInfo.title}
          />
        </div>
        <div className="w-3/4">
          <p className="font-bold text-2xl mb-3">{state.volumeInfo.title}</p>
          <p className="mb-2">{state.volumeInfo.description}</p>
          <p>
            <span className="font-semibold mr-1">Authors:</span>
            <span>{state.volumeInfo.authors.join(", ")}</span>
          </p>
          <p>
            <span className="font-semibold mr-1">Publisher: </span>
            <span>{state.volumeInfo.publisher}</span>
          </p>
          <p>
            <span className="font-semibold mr-1">Publish Date:</span>
            <span>{state.volumeInfo.publishedDate}</span>
          </p>
          <p>
            <span className="font-semibold mr-1">Page:</span>
            <span>{state.volumeInfo.pageCount}</span>
          </p>
          <p>
            <span className="font-semibold mr-1">Rating:</span>
            <span>{state.volumeInfo.averageRating ?? "-"}</span>
          </p>
          <p>
            <span className="font-semibold mr-1">Language:</span>
            <span>{state.volumeInfo.language}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
