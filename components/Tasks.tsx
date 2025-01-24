"use client"
import * as React from "react"
import { redirect } from "next/navigation"

import { useAuth } from "@/context/AuthContext"

import AddTask from "@/components/AddTask"
import TaskList from "@/components/TaskList"

const Tasks: React.FC = () => {
  const { user } = useAuth()

  React.useEffect(() => {
    if (!user.isAuthenticated) {
      redirect("/")
    }
  }, [user.isAuthenticated])

  return (
    <section className="mx-auto mt-32 w-full px-5 md:px-0 md:w-[500px] md:mt-40">
      <h1 className="mb-3 font-semibold text-neutral-700 dark:text-neutral-200">
        Hi {user.name} ;)
      </h1>
      <AddTask />
      <TaskList />
    </section>
  )
}

export default Tasks
