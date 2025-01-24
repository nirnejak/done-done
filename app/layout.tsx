import * as React from "react"

import type { Viewport } from "next"
import { ViewTransitions } from "next-view-transitions"
import localFont from "next/font/local"

import { Toaster } from "sonner"

import { renderSchemaTags } from "@/utils/schema"
import AuthProvider from "@/context/AuthContext"
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
  themeColor: "#fafafa",
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <ViewTransitions>
      <html lang="en" className={sansFont.variable}>
        <head>{renderSchemaTags()}</head>

        <body className="overflow-x-hidden bg-neutral-50 dark:bg-neutral-900 font-sans">
          <AuthProvider>{children}</AuthProvider>
          <ThemeToggle />
          <Toaster position="bottom-right" closeButton />
        </body>
      </html>
    </ViewTransitions>
  )
}

export default RootLayout
