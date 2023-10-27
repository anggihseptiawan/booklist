import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Books } from "../types/book"

export default function Home() {
  const [books, setBooks] = useState<Books | null>(null)

  useEffect(() => {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=20"
    )
      .then((res) => res.json())
      .then((data) => setBooks(data))
  }, [])

  if (!books) return

  return (
    <div className="container max-w-6xl mx-auto py-6">
      <div className="flex flex-wrap gap-2">
        {books.items.map((book) => (
          <div key={book.id} className="flex basis-[330px] gap-2 mb-3">
            <img
              src={book.volumeInfo.imageLinks?.smallThumbnail}
              className="w-20"
              alt={book.volumeInfo.title}
            />
            <div>
              <Link to={`/book/${book.id}`} state={book}>
                <p className="font-semibold">{book.volumeInfo.title}</p>
              </Link>
              <small>Authors: {book.volumeInfo.authors.join(", ")}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
