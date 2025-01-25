"use client"
import * as React from "react"

import { Plus, Calendar as CalendarIcon } from "akar-icons"
import { AnimatePresence, motion } from "motion/react"

import classNames from "@/utils/classNames"
import { BASE_TRANSITION } from "@/utils/animation"

import useDynamicHeight from "@/hooks/useDynamicHeight"
import useClickOutside from "@/hooks/useClickOutside"

import { useTasks } from "@/context/TasksContext"

const AddTask: React.FC = () => {
  const { addTask } = useTasks()

  const { ref, height } = useDynamicHeight()
  const [isFocused, setIsFocused] = React.useState(false)
  const containerRef = useClickOutside(() => {
    if (title.length === 0 && description.length === 0) {
      setIsFocused(false)
    }
  })

  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [dueDate, setDueDate] = React.useState("")

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    addTask(title, description, dueDate)

    setTitle("")
    setDescription("")
    setDueDate("")
    setIsFocused(false)
  }

  return (
    <div ref={containerRef}>
      <motion.form
        animate={{ height: height + 16 }} // added 16px for the padding
        onSubmit={handleFormSubmit}
        onClick={() => setIsFocused(true)}
        className="group relative mb-8 md:mb-12 flex flex-col items-center rounded-3xl bg-neutral-200 p-2 shadow-heavy dark:bg-neutral-800 dark:shadow-md"
      >
        <div ref={ref} className="w-full">
          <input
            type="text"
            value={title}
            className={classNames(
              "relative w-full rounded-2xl py-2.5 px-3 text-sm shadow-heavy focus:outline-hidden dark:shadow-md",
              "bg-neutral-50 text-neutral-700 placeholder:text-neutral-500",
              "dark:bg-neutral-900 dark:text-neutral-300 dark:placeholder:text-neutral-400"
            )}
            placeholder="Add new task..."
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            required
          />
          <AnimatePresence mode="popLayout" initial={false}>
            {isFocused && (
              <motion.textarea
                transition={BASE_TRANSITION}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                value={description}
                className={classNames(
                  "relative w-full flex mt-2 rounded-2xl py-2.5 px-3 text-sm shadow-heavy focus:outline-hidden dark:shadow-md",
                  "bg-neutral-50 text-neutral-700 placeholder:text-neutral-500",
                  "dark:bg-neutral-900 dark:text-neutral-300 dark:placeholder:text-neutral-400"
                )}
                placeholder="Task description..."
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                rows={3}
              />
            )}
          </AnimatePresence>
          <div className="absolute bottom-3.5 right-3.5 z-5 flex items-center gap-1.5">
            {isFocused && (
              <motion.div
                transition={BASE_TRANSITION}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs bg-neutral-200 pl-3 pr-2.5 py-1.5 rounded-xl dark:bg-neutral-800 dark:text-neutral-200"
              >
                <span className="mr-1 font-medium">Due:</span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value)
                  }}
                  className="text-xs w-[96px] outline-hidden"
                />
              </motion.div>
            )}
            <button
              onClick={(e) => e.stopPropagation()}
              className={classNames(
                "flex items-center gap-1 rounded-xl pl-3 pr-2.5 py-1.5 text-xs shadow-heavy outline-hidden transition-colors dark:shadow-md",
                "bg-neutral-600 text-neutral-100 hover:bg-neutral-700 focus:bg-neutral-700",
                "dark:bg-neutral-300 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
              )}
            >
              <span>Add task</span>
              <Plus size={11} />
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  )
}

export default AddTask
