import * as React from "react"

import type { Viewport } from "next"
import { ViewTransitions } from "next-view-transitions"
import localFont from "next/font/local"

import classNames from "@/utils/classNames"
import { renderSchemaTags } from "@/utils/schema"

import ThemeToggle from "@/components/ThemeToggle"

import "../styles/main.css"

const sansFont = localFont({
  variable: "--sans-font",
  src: [
    {
      path: "../fonts/GeneralSans-Variable.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-VariableItalic.woff2",
      weight: "300 800",
      style: "italic",
    },
  ],
})

export const viewport: Viewport = {
  themeColor: "#000000",
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>{renderSchemaTags()}</head>

        <body
          className={classNames(
            sansFont.variable,
            "overflow-x-hidden bg-neutral-50 dark:bg-neutral-900 font-sans"
          )}
        >
          {children}
          <ThemeToggle />
        </body>
      </html>
    </ViewTransitions>
  )
}

export default RootLayout
