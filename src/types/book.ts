export interface Books {
  kind: string
  totalItems: number
  items: Book[]
}

export interface Book {
  id: string
  volumeInfo: {
    title: string
    description: string
    imageLinks: {
      smallThumbnail?: string
      thumbnail?: string
    }
    authors: string[]
    publisher: string
    publishedDate: string
    pageCount: number
    averageRating: string
    language: string
    pdf: {
      isAvailable: boolean
    }
  }
}
