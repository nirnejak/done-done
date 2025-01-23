"use client"
import * as React from "react"

import { Plus } from "akar-icons"

import classNames from "@/utils/classNames"
import { useTasks } from "@/context/TasksContext"

const AddTask: React.FC = () => {
  const { addTask } = useTasks()

  const [title, setTitle] = React.useState("")

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (title.length === 0) return

    addTask(title)
    setTitle("")
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="group relative mb-12 flex items-center rounded-3xl bg-neutral-200 p-2 shadow-heavy dark:bg-neutral-800 dark:shadow-md"
    >
      <Plus
        size={15}
        className="absolute left-5 z-10 text-neutral-400 group-hover:text-neutral-700 group-focus:text-neutral-700 dark:group-hover:text-neutral-300 dark:group-focus:text-neutral-300"
      />
      <input
        type="text"
        value={title}
        className={classNames(
          "relative w-full rounded-2xl py-2.5 pl-8 pr-3 text-sm shadow-heavy focus:outline-none dark:shadow-md",
          "bg-neutral-50 text-neutral-700 placeholder:text-neutral-500",
          "dark:bg-neutral-900 dark:text-neutral-300 dark:placeholder:text-neutral-400"
        )}
        placeholder="Add new task and hit enter..."
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      />
      <button
        className={classNames(
          "absolute right-3.5 z-10 rounded-xl px-3 py-1.5 text-xs shadow-md outline-none transition-colors dark:shadow-md",
          "bg-neutral-600 text-neutral-100 hover:bg-neutral-700 focus:bg-neutral-700",
          "dark:bg-neutral-300 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
        )}
      >
        Add task
      </button>
    </form>
  )
}

export default AddTask
