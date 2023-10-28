export const booksFetcher = (index: number) =>
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=typescript&startIndex=${index}&maxResults=30`
  )
    .then((res) => res.json())
    .then((data) => data)
