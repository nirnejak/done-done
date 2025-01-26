import { toast } from "sonner"

const handleError = (message: string, error?: any) => {
  toast(message)
  console.error(error)

  localStorage.clear()
  window.location.reload()
}

export const getTodos = async (token: string) => {
  try {
    const response = await fetch("/api/todo", {
      method: "GET",
      headers: { Authorization: token },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      if (response.status === 401) {
        handleError("Session expired")
      }
    }
  } catch (error) {
    handleError("Something went wrong", error)
  }
}

export const addTodo = async (
  token: string,
  title: string,
  description: string,
  dueDate: string
) => {
  try {
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: { Authorization: token },
      body: JSON.stringify({ title, description, dueDate }),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      if (response.status === 401) {
        handleError("Session expired")
      }
    }
  } catch (error) {
    handleError("Something went wrong", error)
  }
}

export const updateTodo = async (
  token: string,
  id: number,
  title: string,
  description: string,
  dueDate: string,
  isCompleted: boolean
) => {
  try {
    const response = await fetch("/api/todo", {
      method: "PUT",
      headers: { Authorization: token },
      body: JSON.stringify({ id, title, description, dueDate, isCompleted }),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      if (response.status === 401) {
        handleError("Session expired")
      }
    }
  } catch (error) {
    handleError("Something went wrong", error)
  }
}

export const toggleTodo = async (
  token: string,
  id: number,
  isCompleted: boolean
) => {
  try {
    const response = await fetch("/api/todo", {
      method: "PUT",
      headers: { Authorization: token },
      body: JSON.stringify({ id, isCompleted }),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      if (response.status === 401) {
        handleError("Session expired")
      }
    }
  } catch (error) {
    handleError("Something went wrong", error)
  }
}

export const removeTodo = async (token: string, id: number) => {
  try {
    const response = await fetch("/api/todo", {
      method: "DELETE",
      headers: { Authorization: token },
      body: JSON.stringify({ id }),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      if (response.status === 401) {
        handleError("Session expired")
      }
    }
  } catch (error) {
    handleError("Something went wrong", error)
  }
}
