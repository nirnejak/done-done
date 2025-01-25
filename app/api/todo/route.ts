import { NextRequest, NextResponse } from "next/server"

import jwt from "jsonwebtoken"
import { and } from "drizzle-orm"

import { db } from "@/drizzle.config"

import { todos } from "@/app/api/schema"

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
      .where({ user_id: userId } as any)

    return NextResponse.json(
      allTodos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate?.toISOString().replace(/T.*/, ""),
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

    const newTodo = await db
      .insert(todos)
      .values({ title, userId, description, dueDate })
      .$returningId()
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

    await db.delete(todos).where(and({ id } as any, { user_id: userId } as any))
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

    await db
      .update(todos)
      .set({ title, description, dueDate, isCompleted })
      .where(and({ id } as any, { user_id: userId } as any))

    return NextResponse.json({ id, title, description, dueDate, isCompleted })
  } catch (error) {
    console.log(error)
    return errorHandler(error, "Failed to update todo")
  }
}
