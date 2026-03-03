import { Link } from "next-view-transitions"
import type * as React from "react"

import { generateMetadata } from "@/utils/metadata"

export const metadata = generateMetadata({
  path: "/",
  title: "Not Found | Done Done",
  description: "Page not found on Done Done",
})

const NotFound: React.FC = () => {
  return (
    <section className="grid min-h-screen place-content-center">
      <div className="text-center">
        <h1 className="mb-3 font-semibold text-9xl text-neutral-800 tracking-tighter dark:text-neutral-300">
          404
        </h1>
        <p className="text-base text-neutral-800 dark:text-neutral-300">
          Page not found, go{" "}
          <Link
            href="/"
            className="font-semibold hover:underline focus:underline"
          >
            Home
          </Link>
        </p>
      </div>
    </section>
  )
}

export default NotFound
