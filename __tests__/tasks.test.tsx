import { beforeAll, describe, expect, it, test, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"

import TasksPage from "@/app/tasks/page"
import AuthProvider from "@/context/AuthContext"
import TasksProvider, { TASK } from "@/context/TasksContext"
import { getTodos } from "@/context/api"

// Mock next/navigation
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}))

beforeAll(async () => {
  const credentials = {
    email: "hello@nirnejak.com",
    password: "password",
  }
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...credentials }),
  })
  const data = await response.json()
  const newUser = {
    name: data.user.name,
    email: data.user.email,
    token: data.token,
  }
  localStorage.setItem("user", JSON.stringify(newUser))

  // Fetch todos from the API and store in localStorage
  const tasksData = await getTodos(newUser.token)
  localStorage.setItem("tasks", JSON.stringify(tasksData))
})

test("Add Task", async () => {
  render(
    <AuthProvider>
      <TasksProvider>
        <TasksPage />
      </TasksProvider>
    </AuthProvider>
  )

  const user = JSON.parse(localStorage.getItem("user") as string)

  // Check All Register elements
  expect(screen.getAllByText(`Hi ${user.name} ;)`)).toBeDefined()
  expect(screen.getAllByPlaceholderText("Add new task...")).toBeDefined()
  expect(screen.getAllByRole("button")).toBeDefined()

  fireEvent.change(screen.getAllByPlaceholderText("Add new task...")[0], {
    target: { value: "New Task" },
  })
  fireEvent.click(screen.getByText("Add task"))

  const tasks = JSON.parse(localStorage.getItem("tasks") as string) as TASK[]
  tasks.forEach((task) => {
    expect(screen.getAllByText(task.title)).toBeDefined()
  })
})
