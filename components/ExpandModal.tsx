"use client"
import * as React from "react"

import classNames from "@/utils/classNames"

import Modal from "@/components/atoms/Modal"
import { Circle, CircleCheckFill, Pencil, TrashBin } from "akar-icons"

import { useTasks, type TASK } from "@/context/TasksContext"
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
          <p className="text-right -mt-12 mb-5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            Due on {formatToDate(new Date(task.dueDate))}
          </p>
        )}
        <p className="text-neutral-500 mb-12">{task.description}</p>

        <div className="flex gap-2">
          <button
            onClick={openDeleteTaskModal}
            className="flex-1 flex gap-1 items-center justify-center rounded-lg px-5 py-2 text-sm transition-all focus:outline-hidden active:scale-95 text-red-500 bg-red-200 hover:text-red-600 hover:bg-red-300 focus:bg-red-300 focus:text-red-600 dark:text-red-100 dark:hover:text-red-50 dark:focus:text-red-50 dark:bg-red-800 dark:hover:bg-red-900 dark:focus:bg-red-900"
          >
            <TrashBin size={17} />
            <span>Delete</span>
          </button>
          <button
            onClick={openEditTaskModal}
            className="flex-1 flex gap-1 items-center justify-center rounded-lg bg-neutral-300 px-5 py-2 text-sm text-neutral-800 transition-all hover:bg-neutral-400 focus:bg-neutral-400 focus:outline-hidden active:scale-95 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
          >
            <Pencil size={17} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              toggleTask(task.id)
              closeModal()
            }}
            className={classNames(
              "flex gap-1 items-center justify-center rounded-lg bg-neutral-800 px-5 py-2 text-sm text-neutral-50 transition-all hover:bg-neutral-900 focus:bg-neutral-900 focus:outline-hidden active:scale-95 dark:bg-neutral-300 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
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
