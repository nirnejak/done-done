"use client"
import * as React from "react"
import { redirect } from "next/navigation"
import { SignOut } from "akar-icons"

import { useAuth } from "@/context/AuthContext"

import AddTask from "@/components/AddTask"
import TaskList from "@/components/TaskList"

const Tasks: React.FC = () => {
  const { user, logoutUser } = useAuth()

  React.useEffect(() => {
    if (user.token.length === 0) {
      redirect("/")
    }
  }, [user.token])

  return (
    <section
      className="
        mx-auto mt-32 w-full px-5
        md:mt-40 md:w-[500px] md:px-0
      "
    >
      <div className="mb-3 flex items-center justify-between">
        <h1
          className="
            font-semibold text-neutral-700
            dark:text-neutral-200
          "
        >
          Hi {user.name} ;)
        </h1>
        <button
          onClick={() => logoutUser()}
          className="
            flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs
            outline-hidden transition-colors
            hover:bg-neutral-200
            focus:bg-neutral-200
            dark:text-neutral-200
            dark:hover:bg-neutral-800
            dark:focus:bg-neutral-800
          "
        >
          <SignOut size={12} />
          <span>Logout</span>
        </button>
      </div>
      <AddTask />
      <TaskList />
    </section>
  )
}

export default Tasks
