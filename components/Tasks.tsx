"use client"
import * as React from "react"
import { redirect } from "next/navigation"

import { useAuth } from "@/context/AuthContext"

const Tasks: React.FC = () => {
  const { user } = useAuth()

  React.useEffect(() => {
    if (!user.isAuthenticated) {
      redirect("/")
    }
  }, [user.isAuthenticated])

  return (
    <section className="mx-auto mt-20 w-[500px] md:mt-40">
      <h1 className="mb-3 font-semibold text-neutral-700 dark:text-neutral-200">
        Hi {user.name} ;)
      </h1>
    </section>
  )
}

export default Tasks
