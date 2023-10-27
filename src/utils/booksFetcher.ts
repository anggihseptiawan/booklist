export const booksFetcher = () =>
  fetch(
    "https://www.googleapis.com/books/v1/volumes?q=typescript&maxResults=20"
  )
    .then((res) => res.json())
    .then((data) => data)
