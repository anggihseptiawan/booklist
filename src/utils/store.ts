import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Rating {
  bookId: string
  value: number
}

interface RatingState {
  ratings: Rating[]
  setRatings: (rating: Rating | Rating[]) => void
}

export const useRatingStore = create<RatingState>()(
  persist(
    (set) => ({
      ratings: [],
      setRatings: (rating) =>
        set((state) => ({
          ratings: Array.isArray(rating) ? rating : [...state.ratings, rating],
        })),
    }),
    { name: "ratings" }
  )
)
