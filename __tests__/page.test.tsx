import { expect, test } from "vitest"

import { fireEvent, render, screen } from "@testing-library/react"

import HomePage from "@/app/page"
import AuthProvider from "@/context/AuthContext"

test("Renders Register & Login Forms", async () => {
  render(
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  )
  // Check All Register elements
  expect(screen.getAllByText("register")).toBeDefined()
  expect(
    screen.getAllByText("Enter your details to get started.")
  ).toBeDefined()
  expect(screen.getAllByPlaceholderText("Name")).toBeDefined()
  expect(screen.getAllByPlaceholderText("Email")).toBeDefined()
  expect(screen.getAllByPlaceholderText("Password")).toBeDefined()
  expect(screen.getAllByRole("button")).toBeDefined()

  // Switch to Login
  await fireEvent.click(screen.getByText("Login"))

  // Assert Login elements
  expect(screen.getAllByText("login")).toBeDefined()
  expect(screen.getAllByText("Continue where you left off.")).toBeDefined()
  expect(screen.getAllByPlaceholderText("Email")).toBeDefined()
  expect(screen.getAllByPlaceholderText("Password")).toBeDefined()
  expect(screen.getAllByRole("button")).toBeDefined()
})
