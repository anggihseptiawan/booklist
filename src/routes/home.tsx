import { Link, useSearchParams } from "react-router-dom"
import { Books } from "../types/book"
import useSWR from "swr"
import { booksFetcher } from "../utils/booksFetcher"
import { useEffect, useState } from "react"
import { useRatingStore } from "../utils/store"

export default function Home() {
  const [books, setBooks] = useState<Books>()
  const { data, isLoading }: { data: Books; isLoading: boolean } = useSWR(
    "/api/books",
    booksFetcher
  )
  const ratings = useRatingStore((state) => state.ratings)
  const [searchParams, setSearchParams] = useSearchParams({ q: "" })
  const query = searchParams.get("q")

  const searchBooks = () => {
    if (!books) return
    const filteredBooks = data.items.filter(
      (book) =>
        book.volumeInfo.title
          .toLowerCase()
          .includes(query?.toLowerCase() || "") ||
        book.volumeInfo.description
          ?.toLowerCase()
          .includes(query?.toLowerCase() || "")
    )
    setBooks({ ...books, items: filteredBooks })
  }

  useEffect(() => {
    if (!data) return
    for (let i = 0; i < data.items.length; i++) {
      const rating = ratings.find(
        (rating) => rating.bookId === data.items[i].id
      )

      // Attach rating by the User to the data from API
      // It's not ideal and not gonna look like this in the real case, it is just to simulate add rating feature
      // Sync the rating that the User already gives to the data
      data.items[i].rating = rating?.value || 0
    }
    setBooks(data)
  }, [data])

  useEffect(() => {
    searchBooks()
  }, [query])

  const sort = (value: string) => {
    if (!books) return

    if (value === "date") {
      const sortedByDate = [...data.items].sort(
        (a, b) =>
          new Date(b.volumeInfo.publishedDate).getTime() -
          new Date(a.volumeInfo.publishedDate).getTime()
      )
      return setBooks({ ...books, items: sortedByDate })
    }

    if (value === "title") {
      const sortedByTitle = [...data.items].sort((a, b) =>
        a.volumeInfo.title < b.volumeInfo.title ? -1 : 1
      )
      return setBooks({ ...books, items: sortedByTitle })
    }

    const sortedByRating = [...data.items].sort((a, b) => b.rating - a.rating)
    setBooks({ ...books, items: sortedByRating })
  }

  if (isLoading) return <p>Loading!!</p>

  return (
    <div className="container max-w-6xl mx-auto py-6">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            className="py-1 px-2 rounded-md border border-slate-500"
            id="search"
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set("q", e.target.value)
                  return prev
                },
                { replace: true }
              )
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort">Sort</label>
          <select
            id="sort"
            className="rounded-sm p-1 border border-slate-500"
            onChange={(e) => sort(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {books?.items.map((book) => (
          <div key={book.id} className="flex basis-[350px] gap-2 mb-3">
            <img
              src={book.volumeInfo.imageLinks?.smallThumbnail}
              className="w-20 object-contain"
              alt={book.volumeInfo.title}
            />
            <div>
              <Link to={`/book/${book.id}`} state={book}>
                <p className="font-semibold text-lg leading-5 mb-1 truncate-text">
                  {book.volumeInfo.title}
                </p>
              </Link>
              <small className="block truncate-text mb-2">
                {book.volumeInfo.description}
              </small>

              <small className="font-semibold mr-1">Rating: </small>
              <small>{book.rating}</small>
              <br />
              <small className="font-semibold mr-1">Release: </small>
              <small>{book.volumeInfo.publishedDate}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
