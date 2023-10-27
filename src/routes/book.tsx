import { Link, useLocation, useParams } from "react-router-dom"
import { Book } from "../types/book"
import { useRatingStore } from "../utils/store"
import { useEffect, useState } from "react"

export default function Book() {
  const { state }: { state: Book } = useLocation()
  const [activeRate, setActiveRate] = useState(0)
  const [ratings, setRatings] = useRatingStore((state) => [
    state.ratings,
    state.setRatings,
  ])
  const params = useParams()

  const addRating = (value: number) => {
    setActiveRate(value)
    const ratingIndex = ratings.findIndex((rate) => rate.bookId === params.id)
    const payload = { bookId: state.id, value }

    if (ratingIndex >= 0) {
      const updatedRatings = [...ratings].splice(ratingIndex, 1, payload)
      setRatings(updatedRatings)
    } else {
      setRatings(payload)
    }
  }

  useEffect(() => {
    const rating = ratings.find((rate) => rate.bookId === params.id)
    if (rating) setActiveRate(rating.value)
  }, [])

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Link to="/" className="text-blue-600">
          Book list
        </Link>
        <img src="/chevron-right.svg" className="h-4" alt="chevron-icon" />
        <span>Book Detail</span>
      </div>
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
            <span>-</span>
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Language:</span>
            <span>{state.volumeInfo.language}</span>
          </p>

          <div>
            <p className="font-semibold mb-2">Give a rate!</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <button key={item} onClick={() => addRating(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={item <= activeRate ? "#ffe100" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
