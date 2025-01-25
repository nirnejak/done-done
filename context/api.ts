export const getTodos = async (token: string) => {
  try {
    const response = await fetch("/api/todo", {
      method: "GET",
      headers: { Authorization: token },
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
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
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
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
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
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
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
  }
}

export const removeTodo = async (token: string, id: number) => {
  try {
    const response = await fetch("/api/todo", {
      method: "DELETE",
      headers: { Authorization: token },
      body: JSON.stringify({ id }),
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
  }
}
