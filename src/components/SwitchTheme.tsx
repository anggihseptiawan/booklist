import { useState, useEffect } from "react"
import { setTheme } from "../utils/setTheme"
import { ThemeOption } from "../types/theme"

export const SwitchTheme = () => {
  const [isSwitchThemeOpen, setIsSwitchThemeOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>("system")

  const switchTheme = (theme: ThemeOption) => {
    setIsSwitchThemeOpen(false)
    localStorage.setItem("theme", theme)
    setTheme()
  }

  function getActiveClass(theme: ThemeOption) {
    return `${
      selectedTheme === theme ? "bg-green-100 dark:bg-slate-800" : ""
    } flex w-full px-4 py-2 gap-2 hover:bg-green-100 dark:hover:bg-slate-800`
  }

  function renderSwitchThemeIcon() {
    function renderImage() {
      if (
        selectedTheme === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
        return <img src="/moon.svg" alt="moon-icon" />
      return <img src="/sun.svg" alt="sun-icon" />
    }

    return (
      <button onClick={() => setIsSwitchThemeOpen(!isSwitchThemeOpen)}>
        {renderImage()}
      </button>
    )
  }

  useEffect(() => {
    if ("theme" in localStorage) {
      setSelectedTheme(localStorage.getItem("theme") as ThemeOption)
    }
  }, [localStorage.theme])

  return (
    <div className="relative">
      {renderSwitchThemeIcon()}
      {isSwitchThemeOpen && (
        <div className="absolute w-52 overflow-hidden rounded-md border-2 border-emerald-400 right-0 bg-white dark:bg-slate-900">
          <button
            className={getActiveClass("light")}
            onClick={() => switchTheme("light")}
          >
            <img src="/sun.svg" alt="light-mode-icon" />
            <p>Light</p>
          </button>
          <button
            className={getActiveClass("dark")}
            onClick={() => switchTheme("dark")}
          >
            <img src="/moon.svg" alt="dark-mode-icon" />
            <p>Dark</p>
          </button>
          <button
            className={getActiveClass("system")}
            onClick={() => switchTheme("system")}
          >
            <img src="/monitor.svg" alt="system-mode-icon" />
            <p>System</p>
          </button>
        </div>
      )}
    </div>
  )
}
