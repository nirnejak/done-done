import { redirect } from "next/navigation"
import { toast } from "sonner"

const responseErrorHandling = (status: number) => {
  if (status === 401) {
    toast("Session expired")
  } else {
    toast("Something went wrong")
  }
  localStorage.clear()
  redirect("/")
}

const resetAndRedirect = (error: any) => {
  console.error(error)
  toast("Something went wrong")
  localStorage.clear()
  redirect("/")
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
      responseErrorHandling(response.status)
    }
  } catch (error) {
    resetAndRedirect(error)
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
      responseErrorHandling(response.status)
    }
  } catch (error) {
    resetAndRedirect(error)
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
      responseErrorHandling(response.status)
    }
  } catch (error) {
    resetAndRedirect(error)
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
      responseErrorHandling(response.status)
    }
  } catch (error) {
    resetAndRedirect(error)
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
      responseErrorHandling(response.status)
    }
  } catch (error) {
    resetAndRedirect(error)
  }
}
