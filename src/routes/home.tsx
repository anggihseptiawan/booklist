import { Link, useSearchParams } from "react-router-dom"
import { Books } from "../types/book"
import useSWR from "swr"
import { booksFetcher } from "../utils/booksFetcher"
import { useEffect, useState } from "react"
import { useRatingStore } from "../utils/store"
import InfiniteScroll from "react-infinite-scroll-component"

export default function Home() {
  const [books, setBooks] = useState<Books>()
  const [activePage, setActivePage] = useState(0)
  const { data, isLoading }: { data: Books; isLoading: boolean } = useSWR(
    "/api/books",
    () => booksFetcher(activePage)
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

      // Add rating field to the `data` from API
      // It's not ideal and not gonna look like this in the real case, it is just to simulate add rating feature
      // Sync the rating that the User already gives to the `data`
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

  const fetchMoreData = async () => {
    if (!books) return
    const result = await booksFetcher(activePage + 30)
    setActivePage(activePage + 30)
    setBooks({ ...books, items: books.items.concat(result.items) })
  }

  if (isLoading || !books) return <p>Loading...</p>

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            className="py-[2px] px-2 rounded-sm border border-slate-500 bg-transparent"
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
            className="rounded-sm p-1 border border-slate-500 bg-transparent"
            onChange={(e) => sort(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      <div>
        <InfiniteScroll
          dataLength={books.items.length}
          next={fetchMoreData}
          hasMore={true}
          className="flex flex-wrap gap-2"
          loader={<h4 className="block">Loading...</h4>}
        >
          {books.items.map((book) => (
            <div key={Math.random()} className="flex basis-[350px] gap-2 mb-3">
              <img
                src={book.volumeInfo.imageLinks?.smallThumbnail}
                className="w-20 object-contain flex-none"
                alt={book.volumeInfo.title.substring(0, 50)}
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
        </InfiniteScroll>
      </div>
    </div>
  )
}
