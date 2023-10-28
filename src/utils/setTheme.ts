export function setTheme(isWithoutTransition?: boolean) {
  if (isWithoutTransition) {
    document.documentElement.style.transition = "none"
  } else {
    if (document.documentElement.hasAttribute("style")) {
      document.documentElement.removeAttribute("style")
    }
  }

  if (!("theme" in localStorage) || localStorage.theme === "system") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  } else {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }
}
