"use client"

import { DesktopDevice, Moon, Sun } from "akar-icons"
import * as React from "react"
import useTheme from "@/hooks/useTheme"
import classNames from "@/utils/classNames"

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const { documentElement } = document

    localStorage.setItem("theme", theme)

    switch (theme) {
      case "dark":
        documentElement.classList.add("dark")
        documentElement.classList.remove("light")
        break
      case "light":
        documentElement.classList.add("light")
        documentElement.classList.remove("dark")
        break
      default: {
        documentElement.classList.remove("light", "dark")
        // Apply system preference
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          documentElement.classList.add("dark")
        } else {
          documentElement.classList.add("light")
        }
      }
    }
  }, [theme])

  return (
    <div className="fixed top-5 right-5 rounded-full bg-neutral-200 p-2 font-medium shadow-heavy dark:bg-neutral-800 dark:shadow-md">
      <div className="flex rounded-full bg-neutral-50 p-1 shadow-heavy dark:bg-neutral-900 dark:shadow-md">
        <button
          type="button"
          className={classNames(
            "rounded-full px-2 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800",
            theme === "system"
              ? "text-neutral-900 dark:text-neutral-200"
              : "text-neutral-400 dark:text-neutral-500"
          )}
          onClick={() => {
            setTheme("system")
          }}
        >
          <DesktopDevice size={19} />
        </button>
        <button
          type="button"
          className={classNames(
            "rounded-full px-2 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800",
            theme === "light"
              ? "text-neutral-900 dark:text-neutral-200"
              : "text-neutral-400 dark:text-neutral-500"
          )}
          onClick={() => {
            setTheme("light")
          }}
        >
          <Sun size={19} />
        </button>
        <button
          type="button"
          className={classNames(
            "rounded-full px-2 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800",
            theme === "dark"
              ? "text-neutral-900 dark:text-neutral-200"
              : "text-neutral-400 dark:text-neutral-500"
          )}
          onClick={() => {
            setTheme("dark")
          }}
        >
          <Moon size={19} />
        </button>
      </div>
    </div>
  )
}

export default ThemeToggle
