import type { Viewport } from "next"
import localFont from "next/font/local"
import { ViewTransitions } from "next-view-transitions"
import type * as React from "react"

import { Toaster } from "sonner"
import ThemeToggle from "@/components/ThemeToggle"
import AuthProvider from "@/context/AuthContext"
import { renderSchemaTags } from "@/utils/schema"

import "./main.css"

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
        <head>
          {renderSchemaTags()}
          <script
            defer
            data-domain="done-done-beta.vercel.app"
            src="https://plausible.io/js/script.js"
          />
        </head>

        <body className="overflow-x-hidden bg-neutral-50 font-sans dark:bg-neutral-900">
          <AuthProvider>{children}</AuthProvider>
          <ThemeToggle />
          <Toaster position="bottom-right" closeButton />
        </body>
      </html>
    </ViewTransitions>
  )
}

export default RootLayout
