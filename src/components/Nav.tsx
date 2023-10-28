import { SwitchTheme } from "./SwitchTheme"

export const Nav = () => {
  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-2xl">Booklist</h1>
      <SwitchTheme />
    </div>
  )
}
