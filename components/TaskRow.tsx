"use client"
import * as React from "react"

import {
  Pencil,
  TrashBin,
  DragVerticalFill,
  Circle,
  CircleCheckFill,
} from "akar-icons"
import { Reorder, useDragControls, useMotionValue } from "motion/react"

import classNames from "@/utils/classNames"

import type { TASK } from "@/context/TasksContext"

interface Props {
  task: TASK
  editTask: (id: number) => void
  deleteTask: (id: number) => void
  toggleTask: (id: number) => void
}

const TaskRow: React.FC<Props> = ({
  task,
  editTask,
  deleteTask,
  toggleTask,
}) => {
  const y = useMotionValue(0)
  const dragControls = useDragControls()

  const style = { y }

  return (
    <Reorder.Item value={task} dragListener={false} dragControls={dragControls}>
      <div
        className={classNames(
          "group -mx-2 flex items-center rounded-lg p-1 outline-hidden transition-colors",
          "text-neutral-700 hover:text-neutral-900 focus:text-neutral-900 hover:bg-neutral-200/50 focus:bg-neutral-200/50",
          "dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            e.key === "Enter" && toggleTask(task.id)
          }}
          onClick={(e) => {
            toggleTask(task.id)
          }}
          className="my-0 flex items-center gap-1 truncate p-1 text-sm"
        >
          <input
            tabIndex={-1}
            type="checkbox"
            className="mr-1 hidden accent-neutral-600"
            id={"task-" + task.id}
            checked={task.isCompleted}
            onChange={() => {
              toggleTask(task.id)
            }}
          />
          {task.isCompleted ? (
            <CircleCheckFill size={18} />
          ) : (
            <Circle size={18} />
          )}
          <label
            htmlFor={"task-" + task.id}
            className="ml-1 font-medium cursor-pointer"
          >
            {task.title}
          </label>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden group-hover:flex group-focus:flex">
            <button
              className="rounded-sm p-1 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-600 focus:bg-neutral-200 focus:text-neutral-600 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
              onClick={(e) => {
                e.stopPropagation()
                editTask(task.id)
              }}
            >
              <Pencil size={17} />
            </button>
            <button
              className="rounded-sm p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600 focus:bg-red-100 focus:text-red-600 dark:hover:bg-red-900 dark:focus:bg-red-900"
              onClick={(e) => {
                e.stopPropagation()
                deleteTask(task.id)
              }}
            >
              <TrashBin size={17} />
            </button>
          </div>
          <div
            className="cursor-grab text-neutral-400"
            style={style as React.CSSProperties}
            onPointerDown={(e) => {
              dragControls.start(e)
            }}
          >
            <DragVerticalFill size={15} />
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}

export default TaskRow
