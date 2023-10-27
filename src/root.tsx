import { Outlet } from "react-router-dom"

export default function Root() {
  return (
    <div className="container max-w-6xl mx-auto py-6">
      <main>
        <Outlet />
      </main>
    </div>
  )
}
