"use client"
import * as React from "react"

import { toast } from "sonner"
import { nanoid } from "nanoid"

export interface TASK {
  id: string
  title: string
  description: string
  isCompleted: boolean
}

export interface TASKS_CONTEXT {
  tasks: TASK[]
  addTask: (title: string, description: string) => void
  updateTask: (id: string, title: string, description: string) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
  sortTasksAlphabetically: () => void
  reorderTasks: (tasks: TASK[]) => void
}

export const TasksContext = React.createContext<TASKS_CONTEXT | null>(null)

interface Props {
  children: React.ReactNode
}

const LOCAL_STORAGE_FIELD = "tasks"

const TasksProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = React.useState<TASK[]>([])

  React.useEffect(() => {
    const localTasks = localStorage.getItem(LOCAL_STORAGE_FIELD)
    if (localTasks !== null) {
      setTasks(JSON.parse(localTasks) as TASK[])
    }
  }, [])

  const reorderTasks = (orderedTasks: TASK[]): void => {
    localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(orderedTasks))
    setTasks(orderedTasks)
  }

  const addTask = (title: string, description: string): void => {
    setTasks((tasks) => {
      const updatedTasks = [
        {
          id: v4(),
          title: title,
          description: "",
          isCompleted: false,
        },
        ...tasks,
      ]

      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(updatedTasks))
      toast.success("Task added successfully", {
        description: title,
      })

      return updatedTasks
    })
  }

  const removeTask = (id: string): void => {
    setTasks((tasks) => {
      const updatedTasks = tasks.filter((task) => task.id !== id)

      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(updatedTasks))
      toast.success("Task removed successfully")

      return updatedTasks
    })
  }

  const updateTask = (id: string, title: string, description: string): void => {
    setTasks((tasks) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title,
            description,
          }
        } else {
          return task
        }
      })

      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(updatedTasks))
      toast.success("Task updated successfully")

      return updatedTasks
    })
  }

  const toggleTask = (id: string): void => {
    setTasks((tasks) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          }
        } else {
          return task
        }
      })
      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(updatedTasks))
      return updatedTasks
    })
  }

  const sortTasksAlphabetically = (): void => {
    setTasks((currentTasks) => {
      const sortedTasks = currentTasks
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
      if (JSON.stringify(currentTasks) === JSON.stringify(sortedTasks)) {
        const reversedTasks = sortedTasks.reverse()
        localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(reversedTasks))
        return reversedTasks
      } else {
        localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(sortedTasks))
        return sortedTasks
      }
    })
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        removeTask,
        toggleTask,
        sortTasksAlphabetically,
        reorderTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider

export const useTasks = (): TASKS_CONTEXT => {
  const context = React.useContext(TasksContext)
  if (context === null)
    throw new Error("useTasks must be used within a TasksProvider")
  return context
}
