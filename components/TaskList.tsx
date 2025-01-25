"use client"
import * as React from "react"

import { AnimatePresence, motion, Reorder } from "motion/react"
import { Leaf, Sort } from "akar-icons"

import { useTasks, type TASK } from "@/context/TasksContext"

import useModal from "@/hooks/useModal"

import TaskRow from "@/components/TaskRow"
import ExpandModal from "@/components/ExpandModal"
import EditModal from "@/components/EditModal"
import DeleteModal from "@/components/DeleteModal"

interface Props {}

const TaskList: React.FC<Props> = () => {
  const { tasks, toggleTask, sortTasksAlphabetically, reorderTasks } =
    useTasks()
  const [isExpanded, setIsExpanded] = useModal()
  const [isEditing, setIsEditing] = useModal()
  const [isDeleting, setIsDeleting] = useModal()
  const [selectedTask, setSelectedTask] = React.useState<TASK | undefined>(
    undefined
  )

  const openExpandTaskModal = (id: number): void => {
    setIsExpanded(true)
    setSelectedTask(tasks.find((task) => task.id === id))
  }

  const openEditTaskModal = (id: number): void => {
    setIsEditing(true)
    setSelectedTask(tasks.find((task) => task.id === id))
  }

  const openDeleteTaskModal = (id: number): void => {
    setIsDeleting(true)
    setSelectedTask(tasks.find((task) => task.id === id))
  }

  return (
    <div>
      <motion.div
        layout
        className="rounded-3xl bg-neutral-200 p-2 shadow-heavy dark:bg-neutral-800 dark:shadow-md"
      >
        <motion.div
          layout
          className="rounded-2xl bg-neutral-50 px-4 pb-2 pt-4 shadow-heavy dark:bg-neutral-900 dark:shadow-md"
        >
          {tasks.length === 0 && (
            <div className="flex items-center flex-col gap-3 my-10 text-neutral-500">
              <div>
                <Leaf />
              </div>
              <p className="text-center text-sm">
                Nothing here, start adding tasks
              </p>
            </div>
          )}
          {tasks.length > 0 && (
            <div className="mb-2 flex items-center text-neutral-500">
              <p className="text-xs font-medium">Tasks</p>
              <button
                className="-mr-1 ml-auto rounded-sm p-1 outline-hidden hover:bg-neutral-200/50 focus:bg-neutral-200/50 dark:hover:bg-neutral-200/10 dark:focus:bg-neutral-200/10"
                onKeyDown={(e) => {
                  e.key === "Enter" && sortTasksAlphabetically()
                }}
                onClick={() => {
                  sortTasksAlphabetically()
                }}
              >
                <Sort size={15} />
              </button>
            </div>
          )}

          <div className="flex w-full select-none flex-col">
            <Reorder.Group axis="y" values={tasks} onReorder={reorderTasks}>
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  toggleTask={toggleTask}
                  expandTask={openExpandTaskModal}
                  editTask={openEditTaskModal}
                  deleteTask={openDeleteTaskModal}
                />
              ))}
            </Reorder.Group>
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {isExpanded && selectedTask !== undefined && (
          <ExpandModal
            task={selectedTask}
            closeModal={() => {
              setSelectedTask(undefined)
              setIsExpanded(false)
            }}
            openEditTaskModal={() => {
              setIsEditing(true)
              setIsExpanded(false)
            }}
            openDeleteTaskModal={() => {
              setIsDeleting(true)
              setIsExpanded(false)
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {isEditing && selectedTask !== undefined && (
          <EditModal
            task={selectedTask}
            closeModal={() => {
              setSelectedTask(undefined)
              setIsEditing(false)
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="popLayout">
        {isDeleting && selectedTask !== undefined && (
          <DeleteModal
            taskId={selectedTask.id}
            closeModal={() => {
              setSelectedTask(undefined)
              setIsDeleting(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default TaskList
