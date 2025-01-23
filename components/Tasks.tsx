"use client"
import * as React from "react"
import { redirect } from "next/navigation"

import { AnimatePresence, motion, Reorder } from "motion/react"
import { Sort } from "akar-icons"

import { useAuth } from "@/context/AuthContext"
import { useTasks, type TASK } from "@/context/TasksContext"

import useModal from "@/hooks/useModal"

import TaskRow from "@/components/TaskRow"
import AddTask from "@/components/AddTask"
import EditModal from "@/components/EditModal"
import DeleteModal from "@/components/DeleteModal"

const Tasks: React.FC = () => {
  const { user } = useAuth()
  const { tasks, toggleTask, sortTasksAlphabetically, reorderTasks } =
    useTasks()
  const [isEditing, setIsEditing] = useModal()
  const [isDeleting, setIsDeleting] = useModal()
  const [selectedTask, setSelectedTask] = React.useState<TASK | undefined>(
    undefined
  )

  React.useEffect(() => {
    if (!user.isAuthenticated) {
      redirect("/")
    }
  }, [user.isAuthenticated])

  const openEditTaskModal = (id: string): void => {
    setIsEditing(true)
    setSelectedTask(tasks.find((task) => task.id === id))
  }

  const deleteTask = (id: string): void => {
    setIsDeleting(true)
    setSelectedTask(tasks.find((task) => task.id === id))
  }

  return (
    <section className="mx-auto mt-20 w-[500px] md:mt-40">
      <h1 className="mb-3 font-semibold text-neutral-700 dark:text-neutral-200">
        Hi {user.name} ;)
      </h1>
      <AddTask />
      <motion.div
        layout
        className="rounded-3xl bg-neutral-200 p-2 shadow-heavy dark:bg-neutral-800 dark:shadow-md"
      >
        <motion.div
          layout
          className="rounded-2xl bg-neutral-50 px-4 pb-2 pt-4 shadow-heavy dark:bg-neutral-900 dark:shadow-md"
        >
          {tasks.length > 0 && (
            <div className="mb-2 flex items-center text-neutral-500">
              <p className="text-xs font-medium">Tasks</p>
              <button
                className="-mr-1 ml-auto rounded p-1 outline-none hover:bg-neutral-200/50 focus:bg-neutral-200/50"
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
                  editTask={openEditTaskModal}
                  deleteTask={deleteTask}
                />
              ))}
            </Reorder.Group>
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
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
      <AnimatePresence>
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
    </section>
  )
}

export default Tasks
