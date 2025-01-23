"use client"

import * as React from "react"
import { DesktopDevice, Moon, Sun } from "akar-icons"

import classNames from "@/utils/classNames"
import useTheme from "@/hooks/useTheme"

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
    <div className="fixed right-5 top-5 rounded-full bg-neutral-200 p-2 font-medium shadow-heavy dark:bg-neutral-800 dark:shadow-md">
      <div className="flex rounded-full bg-neutral-50 p-1 shadow-heavy dark:bg-neutral-900 dark:shadow-md">
        <button
          className={classNames(
            "dark:hover:bg-neutral-800 hover:bg-neutral-200 px-2 py-2 rounded-full",
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
          className={classNames(
            "dark:hover:bg-neutral-800 hover:bg-neutral-200 px-2 py-2 rounded-full",
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
          className={classNames(
            "dark:hover:bg-neutral-800 hover:bg-neutral-200 px-2 py-2 rounded-full",
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
