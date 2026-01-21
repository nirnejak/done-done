import { NextRequest, NextResponse } from "next/server"

import jwt from "jsonwebtoken"
import { and, eq } from "drizzle-orm"

import { db } from "@/lib/db"

import { todos } from "@/app/api/schema"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (error: any, defaultMessage: string) => {
  if (
    error instanceof jwt.JsonWebTokenError ||
    error instanceof jwt.NotBeforeError ||
    error instanceof jwt.TokenExpiredError
  ) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 })
  }

  return NextResponse.json({ error: defaultMessage }, { status: 500 })
}

export async function GET(request: NextRequest) {
  const rawToken = request.headers.get("Authorization") || ""
  const token = rawToken.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: number }
    const userId = decoded.id

    const allTodos = await db
      .select()
      .from(todos)
      .where((todos) => eq(todos.userId, userId))

    return NextResponse.json(
      allTodos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        isCompleted: todo.isCompleted,
      }))
    )
  } catch (error) {
    console.log(error)
    return errorHandler(error, "Failed to get todos")
  }
}

export async function POST(request: NextRequest) {
  const rawToken = request.headers.get("Authorization") || ""
  const token = rawToken.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: number }
    const userId = decoded.id

    const { title, description, dueDate } = await request.json()
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fields: Record<string, any> = { title, userId, description }
    if (dueDate) {
      fields = { ...fields, dueDate }
    }

    const newTodo = await db
      .insert(todos)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .values(fields as any)
      .returning()
    return NextResponse.json({
      id: newTodo[0].id,
      title,
      description,
      dueDate,
      isCompleted: false,
    })
  } catch (error) {
    console.log(error)
    return errorHandler(error, "Failed to create todo")
  }
}

export async function DELETE(request: NextRequest) {
  const rawToken = request.headers.get("Authorization") || ""
  const token = rawToken.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: number }
    const userId = decoded.id

    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await db
      .delete(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error)
    return errorHandler(error, "Failed to delete todo")
  }
}

export async function PUT(request: NextRequest) {
  const rawToken = request.headers.get("Authorization") || ""
  const token = rawToken.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: number }
    const userId = decoded.id

    const { id, title, description, dueDate, isCompleted } =
      await request.json()
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fields: Record<string, any> = { title, description, isCompleted }
    if (dueDate) {
      fields = { ...fields, dueDate }
    }

    await db
      .update(todos)
      .set(fields)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))

    return NextResponse.json({ id, title, description, dueDate, isCompleted })
  } catch (error) {
    console.log(error)
    return errorHandler(error, "Failed to update todo")
  }
}
