"use client"
import * as React from "react"
import Modal from "@/components/atoms/Modal"
import { useTasks } from "@/context/TasksContext"

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
          type="button"
          onClick={closeModal}
          className="flex-1 rounded-lg bg-neutral-800 px-5 py-2 text-neutral-50 text-sm transition-all hover:bg-neutral-900 focus:bg-neutral-900 focus:outline-hidden active:scale-95 dark:bg-neutral-300 dark:text-neutral-900 dark:focus:bg-neutral-200 dark:hover:bg-neutral-200"
        >
          Cancel
        </button>
        <button
          type="button"
          ref={ref}
          onClick={deleteTask}
          className="flex-1 rounded-lg bg-red-800 px-5 py-2 text-neutral-50 text-sm transition-all hover:bg-red-900 focus:bg-red-900 focus:outline-hidden active:scale-95"
        >
          Delete Task
        </button>
      </div>
    </Modal>
  )
}

export default DeleteModal
