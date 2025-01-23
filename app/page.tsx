import * as React from "react"

import * as motion from "motion/react-client"

import { BASE_TRANSITION } from "@/utils/animation"
import { generateMetadata } from "@/utils/metadata"

export const metadata = generateMetadata({
  path: "/",
  title: "Done Done",
  description: "A sleek and simple todo list app",
})

const Home: React.FC = () => {
  return (
    <main className="grid h-screen place-content-center">
      <motion.h1
        initial={{ translateY: 20, opacity: 0, filter: `blur(10px)` }}
        animate={{ translateY: 0, opacity: 1, filter: "none" }}
        transition={{ delay: 0, ...BASE_TRANSITION }}
        className="text-5xl font-bold tracking-tighter text-zinc-800 dark:text-zinc-300"
      >
        A sleek and simple todo list app
      </motion.h1>
    </main>
  )
}

export default Home
