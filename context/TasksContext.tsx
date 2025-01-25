"use client"
import * as React from "react"

import { toast } from "sonner"

import { useAuth } from "./AuthContext"

export interface TASK {
  id: number
  title: string
  description: string
  dueDate: string
  isCompleted: boolean
}

export interface TASKS_CONTEXT {
  tasks: TASK[]
  addTask: (title: string, description: string) => void
  updateTask: (id: number, title: string, description: string) => void
  removeTask: (id: number) => void
  toggleTask: (id: number) => void
  sortTasksAlphabetically: () => void
  reorderTasks: (tasks: TASK[]) => void
}

export const TasksContext = React.createContext<TASKS_CONTEXT | null>(null)

interface Props {
  children: React.ReactNode
}

const LOCAL_STORAGE_FIELD = "tasks"

const TasksProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuth()
  const [tasks, setTasks] = React.useState<TASK[]>([])

  React.useEffect(() => {
    if (user.token) {
      const fetchTodos = async () => {
        try {
          const response = await fetch("/api/todo", {
            method: "GET",
            headers: { Authorization: user.token },
          })
          const data = await response.json()

          setTasks(data)
          const localTasks = localStorage.getItem(LOCAL_STORAGE_FIELD)
          if (localTasks !== null) {
            const parsedLocalTasks = JSON.parse(localTasks) as TASK[]
            // TODO: sync parsedLocalTasks with data
          }
        } catch (error) {
          console.error(error)
        }
      }
      fetchTodos()
    }
  }, [user.token])

  const reorderTasks = (orderedTasks: TASK[]): void => {
    localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(orderedTasks))
    setTasks(orderedTasks)
  }

  const addTask = (title: string, description: string): void => {
    setTasks((tasks) => {
      const updatedTasks = [
        {
          id: 1,
          title,
          description,
          dueDate: "",
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

  const removeTask = (id: number): void => {
    setTasks((tasks) => {
      const updatedTasks = tasks.filter((task) => task.id !== id)

      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(updatedTasks))
      toast.success("Task removed successfully")

      return updatedTasks
    })
  }

  const updateTask = (id: number, title: string, description: string): void => {
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

  const toggleTask = (id: number): void => {
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
