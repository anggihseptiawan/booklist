import { Link, useSearchParams } from "react-router-dom"
import { Books } from "../types/book"
import useSWR from "swr"
import { booksFetcher } from "../utils/booksFetcher"
import { useEffect, useState } from "react"

export default function Home() {
  const [books, setBooks] = useState<Books>()
  const { data, isLoading }: { data: Books; isLoading: boolean } = useSWR(
    "/api/books",
    booksFetcher
  )
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
    setBooks(data)
  }, [data])

  useEffect(() => {
    searchBooks()
  }, [query])

  const sort = (value: string) => {
    if (!books) return

    if (value === "date") {
      const sorted = [...data.items].sort(
        (a, b) =>
          new Date(b.volumeInfo.publishedDate).getTime() -
          new Date(a.volumeInfo.publishedDate).getTime()
      )
      setBooks({ ...books, items: sorted })
    }

    if (value === "title") {
      const sorted = [...data.items].sort((a, b) =>
        a.volumeInfo.title < b.volumeInfo.title ? -1 : 1
      )
      setBooks({ ...books, items: sorted })
    }
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
              <small className="font-semibold mr-1">Release: </small>
              <small>{book.volumeInfo.publishedDate}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
