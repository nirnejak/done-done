"use client"
import * as React from "react"

import classNames from "@/utils/classNames"

import Modal from "@/components/atoms/Modal"

import { useTasks, type TASK } from "@/context/TasksContext"

interface Props {
  task: TASK
  closeModal: () => void
}

const EditModal: React.FC<Props> = ({ task, closeModal }) => {
  const ref = React.useRef<HTMLInputElement>(null)
  const { updateTask } = useTasks()

  const [title, setTitle] = React.useState(task.title)

  React.useEffect(() => {
    ref.current?.focus()
  }, [])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (title.length === 0) return

    updateTask(task.id, title)

    setTitle("")
    closeModal()
  }

  return (
    <Modal title="Edit Task" closeModal={closeModal}>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Task"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          className={classNames(
            "rounded-lg border px-3 py-2 text-sm outline-none",
            "bg-neutral-100 focus:border-neutral-300 text-neutral-600 placeholder:text-neutral-400",
            "dark:bg-neutral-800 dark:focus:border-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500 dark:border-neutral-700"
          )}
          ref={ref}
          required
        />
        <div className="flex gap-2">
          <button
            onClick={closeModal}
            className="flex-1 rounded-lg bg-neutral-300 px-5 py-2 text-sm text-neutral-800 transition-all hover:bg-neutral-400 focus:bg-neutral-400 focus:outline-none active:scale-95 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-neutral-800 px-5 py-2 text-sm text-neutral-50 transition-all hover:bg-neutral-900 focus:bg-neutral-900 focus:outline-none active:scale-95 dark:bg-neutral-300 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
          >
            Update Task
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditModal
