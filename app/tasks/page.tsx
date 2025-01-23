import * as React from "react"

import * as motion from "motion/react-client"

import { BASE_TRANSITION } from "@/utils/animation"
import { generateMetadata } from "@/utils/metadata"

export const metadata = generateMetadata({
  path: "/tasks",
  title: "Tasks - Done Done",
  description: "A sleek and simple todo list app",
})

const Home: React.FC = () => {
  return (
    <main className="grid h-screen place-content-center">
      <motion.h1
        initial={{ translateY: 20, opacity: 0, filter: `blur(10px)` }}
        animate={{ translateY: 0, opacity: 1, filter: "none" }}
        transition={{ delay: 0, ...BASE_TRANSITION }}
        className="text-5xl font-bold tracking-tighter text-neutral-800 dark:text-neutral-300"
      >
        Tasks
      </motion.h1>
    </main>
  )
}

export default Home
