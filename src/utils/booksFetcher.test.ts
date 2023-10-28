import { expect, test } from "vitest"
import { booksFetcher } from "./booksFetcher"
import { Books } from "../types/book"

test("Books items should be 30", async () => {
  const result: Books = await booksFetcher(0)
  expect(result.items.length).toBe(30)
})
