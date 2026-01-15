"use client"
import * as React from "react"

import { useTasks } from "@/context/TasksContext"

import Modal from "@/components/atoms/Modal"

interface Props {
  taskId: number
  closeModal: () => void
}

const DeleteModal: React.FC<Props> = ({ taskId, closeModal }) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { removeTask } = useTasks()

  React.useEffect(() => {
    ref.current?.focus()
  }, [])

  const deleteTask = (): void => {
    removeTask(taskId)
    closeModal()
  }

  return (
    <Modal
      title="Are you sure you want to delete this task?"
      closeModal={closeModal}
    >
      <div className="flex gap-2">
        <button
          onClick={closeModal}
          className="
            flex-1 rounded-lg bg-neutral-800 px-5 py-2 text-sm text-neutral-50
            transition-all
            hover:bg-neutral-900
            focus:bg-neutral-900 focus:outline-hidden
            active:scale-95
            dark:bg-neutral-300 dark:text-neutral-900
            dark:hover:bg-neutral-200
            dark:focus:bg-neutral-200
          "
        >
          Cancel
        </button>
        <button
          ref={ref}
          onClick={deleteTask}
          className="
            flex-1 rounded-lg bg-red-800 px-5 py-2 text-sm text-neutral-50
            transition-all
            hover:bg-red-900
            focus:bg-red-900 focus:outline-hidden
            active:scale-95
          "
        >
          Delete Task
        </button>
      </div>
    </Modal>
  )
}

export default DeleteModal
