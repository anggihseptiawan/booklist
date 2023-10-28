import { Outlet } from "react-router-dom"
import { Nav } from "./components/Nav"

export default function Root() {
  return (
    <div className="container max-w-6xl mx-auto py-6 px-4">
      <Nav />
      <main className="py-6">
        <Outlet />
      </main>
    </div>
  )
}
