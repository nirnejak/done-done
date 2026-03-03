"use client"
import { Circle, CircleCheckFill, Pencil, TrashBin } from "akar-icons"
import * as React from "react"

import Modal from "@/components/atoms/Modal"
import { type TASK, useTasks } from "@/context/TasksContext"
import classNames from "@/utils/classNames"
import { formatToDate } from "@/utils/datetime"

interface Props {
  task: TASK
  closeModal: () => void
  openEditTaskModal: () => void
  openDeleteTaskModal: () => void
}

const ExpandModal: React.FC<Props> = ({
  task,
  closeModal,
  openEditTaskModal,
  openDeleteTaskModal,
}) => {
  const ref = React.useRef<HTMLInputElement>(null)
  const { toggleTask } = useTasks()

  React.useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <Modal title={task.title} closeModal={closeModal}>
      <div className="">
        {task.dueDate && (
          <p className="-mt-12 mb-5 text-right font-medium text-neutral-600 text-xs dark:text-neutral-300">
            Due on {formatToDate(new Date(task.dueDate))}
          </p>
        )}
        <p className="mb-12 text-neutral-500">{task.description}</p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={openDeleteTaskModal}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-200 px-5 py-2 text-red-500 text-sm transition-all hover:bg-red-300 hover:text-red-600 focus:bg-red-300 focus:text-red-600 focus:outline-hidden active:scale-95 dark:bg-red-800 dark:text-red-100 dark:focus:bg-red-900 dark:focus:text-red-50 dark:hover:bg-red-900 dark:hover:text-red-50"
          >
            <TrashBin size={17} />
            <span>Delete</span>
          </button>
          <button
            type="button"
            onClick={openEditTaskModal}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-neutral-300 px-5 py-2 text-neutral-800 text-sm transition-all hover:bg-neutral-400 focus:bg-neutral-400 focus:outline-hidden active:scale-95 dark:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-600 dark:hover:bg-neutral-600"
          >
            <Pencil size={17} />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => {
              toggleTask(task.id)
              closeModal()
            }}
            className={classNames(
              "flex items-center justify-center gap-1 rounded-lg bg-neutral-800 px-5 py-2 text-neutral-50 text-sm transition-all hover:bg-neutral-900 focus:bg-neutral-900 focus:outline-hidden active:scale-95 dark:bg-neutral-300 dark:text-neutral-900 dark:focus:bg-neutral-200 dark:hover:bg-neutral-200"
            )}
          >
            {task.isCompleted ? (
              <>
                <Circle size={17} />
                <span>Mark undone</span>
              </>
            ) : (
              <>
                <CircleCheckFill size={17} />
                <span>Mark as done</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ExpandModal
