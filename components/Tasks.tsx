"use client"
import * as React from "react"
import { redirect } from "next/navigation"

import { useAuth } from "@/context/AuthContext"

import AddTask from "@/components/AddTask"
import TaskList from "@/components/TaskList"
import { SignOut } from "akar-icons"

const Tasks: React.FC = () => {
  const { user, logoutUser } = useAuth()

  React.useEffect(() => {
    if (user.token.length === 0) {
      redirect("/")
    }
  }, [user.token])

  return (
    <section className="mx-auto mt-32 w-full px-5 md:px-0 md:w-[500px] md:mt-40">
      <div className="mb-3 flex justify-between items-center">
        <h1 className=" font-semibold text-neutral-700 dark:text-neutral-200">
          Hi {user.name} ;)
        </h1>
        <button
          onClick={() => logoutUser()}
          className="text-xs px-3 transition-colors py-1.5 flex gap-1 items-center rounded-xl hover:bg-neutral-200 focus:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 outline-hidden dark:text-neutral-200"
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
