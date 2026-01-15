"use client"
import * as React from "react"

import { toast } from "sonner"
import useSound from "use-sound"
import { TrashBin } from "akar-icons"

import { useAuth } from "./AuthContext"
import { getTodos, addTodo, removeTodo, updateTodo } from "./api"

export interface TASK {
  id: number
  title: string
  description: string
  dueDate: string
  isCompleted: boolean
}

export interface TASKS_CONTEXT {
  isFetching: boolean
  isAdding: boolean
  tasks: TASK[]
  addTask: (title: string, description: string, dueDate: string) => void
  updateTask: (
    id: number,
    title: string,
    description: string,
    dueDate: string,
    isCompleted: boolean
  ) => void
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

const mergeUniqueTasks = (updatedLocalTasks: TASK[], data: TASK[]): TASK[] => {
  const existingIds = new Set(updatedLocalTasks.map((task) => task.id))

  // Filter tasks from `data` that are not in `updatedLocalTasks`
  const newTasks = data.filter((task) => !existingIds.has(task.id))

  // Merge the arrays while maintaining the order of `updatedLocalTasks`
  return [...newTasks, ...updatedLocalTasks]
}

const TasksProvider: React.FC<Props> = ({ children }) => {
  const [playTick] = useSound("../sounds/tick.wav")
  const [playThunk] = useSound("../sounds/thunk.wav")

  const { user } = useAuth()
  const [isFetching, setFetching] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)
  const [tasks, setTasks] = React.useState<TASK[]>([])

  React.useEffect(() => {
    if (user.token) {
      const fetchTodos = async () => {
        setFetching(true)
        const data = await getTodos(user.token)
        setFetching(false)
        const localTasks = localStorage.getItem(LOCAL_STORAGE_FIELD)

        try {
          // Sync local while keeping the order same
          if (localTasks !== null && localTasks !== "undefined") {
            const parsedLocalTasks = JSON.parse(localTasks) as TASK[]

            // if item isn't present in remote, remove it from local
            const validLocalTasks = parsedLocalTasks.filter((task) => {
              return data.some((t: TASK) => t.id === task.id)
            })
            // update local items from remote
            const updatedLocalTasks = validLocalTasks.map((task) => {
              return data.find((t: TASK) => t.id === task.id)
            })
            // if there are new items, put them at the start
            const mergedTasks = mergeUniqueTasks(updatedLocalTasks, data)

            setTasks(mergedTasks)
            localStorage.setItem(
              LOCAL_STORAGE_FIELD,
              JSON.stringify(mergedTasks)
            )
          } else {
            setTasks(data)
            localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(data))
          }
        } catch (error) {
          console.log(error)
          setTasks(data)
          localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(data))
        }
      }

      if (process.env.VITEST) {
        const localTasks = localStorage.getItem(LOCAL_STORAGE_FIELD)
        const parsedLocalTasks = JSON.parse(localTasks as string) as TASK[]
        setTasks(parsedLocalTasks)
      } else {
        fetchTodos()
      }
    }
  }, [user.token])

  const reorderTasks = (orderedTasks: TASK[]): void => {
    localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(orderedTasks))
    setTasks(orderedTasks)
  }

  const addTask = async (
    title: string,
    description: string,
    dueDate: string
  ): Promise<void> => {
    setIsAdding(true)
    const newTask = await addTodo(user.token, title, description, dueDate)
    setIsAdding(false)
    toast.success("Task added successfully", {
      description: title,
    })

    setTasks((tasks) => {
      const updatedTasks = [newTask, ...tasks]
      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(updatedTasks))
      return updatedTasks
    })
  }

  const removeTask = async (id: number): Promise<void> => {
    playThunk()

    setTasks((tasks) => {
      const updatedTasks = tasks.filter((task) => task.id !== id)
      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(updatedTasks))
      return updatedTasks
    })
    const data = await removeTodo(user.token, id)

    if (data.success) {
      toast.success("Task removed successfully", {
        icon: <TrashBin size={16} className="text-red-600" />,
      })
    }
  }

  const updateTask = async (
    id: number,
    title: string,
    description: string,
    dueDate: string,
    isCompleted: boolean
  ): Promise<void> => {
    setTasks((tasks) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, description, dueDate, isCompleted }
        } else {
          return task
        }
      })
      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(updatedTasks))
      return updatedTasks
    })

    const data = await updateTodo(
      user.token,
      id,
      title,
      description,
      dueDate,
      isCompleted
    )
    if (data.id) {
      toast.success("Task updated successfully")
    }
  }

  const toggleTask = async (id: number): Promise<void> => {
    const taskArr = tasks.filter((task) => id === task.id)
    if (taskArr.length > 0) {
      const updatedTask = taskArr[0]
      updatedTask.isCompleted = !updatedTask.isCompleted

      if (updatedTask.isCompleted) {
        playTick()
      }

      setTasks((tasks) => {
        const updatedTasks = tasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask
          } else {
            return task
          }
        })

        localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(updatedTasks))
        return updatedTasks
      })

      await updateTodo(
        user.token,
        updatedTask.id,
        updatedTask.title,
        updatedTask.description,
        updatedTask.dueDate,
        updatedTask.isCompleted
      )
    }
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
        isFetching,
        isAdding,
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
