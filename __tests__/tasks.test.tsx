import { beforeAll, expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import TasksPage from "@/app/tasks/page"
import AuthProvider from "@/context/AuthContext"
import TasksProvider, { TASK } from "@/context/TasksContext"

// Mock next/navigation
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}))

// Mock use-sound to avoid audio issues in tests
vi.mock("use-sound", () => ({
  default: () => [vi.fn(), { sound: null }],
}))

const mockUser = {
  name: "Test User",
  email: "test@example.com",
  token: "mock-token-12345",
}

const mockTasks: TASK[] = [
  {
    id: 1,
    title: "Test Task 1",
    description: "Description 1",
    dueDate: "2024-12-31",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Test Task 2",
    description: "Description 2",
    dueDate: "2024-12-31",
    isCompleted: true,
  },
]

beforeAll(() => {
  localStorage.clear()
  localStorage.setItem("user", JSON.stringify(mockUser))
  localStorage.setItem("tasks", JSON.stringify(mockTasks))
})

test("Renders Tasks Page with User and Tasks", async () => {
  render(
    <AuthProvider>
      <TasksProvider>
        <TasksPage />
      </TasksProvider>
    </AuthProvider>
  )

  // Check user greeting
  expect(screen.getByText(`Hi ${mockUser.name} ;)`)).toBeDefined()

  // Check add task input exists
  expect(screen.getByPlaceholderText("Add new task...")).toBeDefined()

  // Check existing tasks are rendered
  mockTasks.forEach((task) => {
    expect(screen.getByText(task.title)).toBeDefined()
  })
})
