import { NextRequest, NextResponse } from "next/server"

import { and } from "drizzle-orm"

import { db } from "@/drizzle.config"

import { todos } from "@/app/api/schema"
import { getUserIdFromRequestHeaderToken } from "@/app/api/utils"

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequestHeaderToken(request)

  try {
    const allTodos = await db.select().from(todos).where({ user_id: userId })
    return NextResponse.json(
      allTodos.map((todo) => ({
        ...todo,
        dueDate: todo.dueDate?.toISOString().replace(/T.*/, ""),
      }))
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromRequestHeaderToken(request)

  try {
    const { title, description, due_date } = await request.json()
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const newTodo = await db
      .insert(todos)
      .values({ title, userId, description, due_date })
      .$returningId()
    return NextResponse.json({
      id: newTodo[0].id,
      title,
      description,
      due_date,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const userId = await getUserIdFromRequestHeaderToken(request)

  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await db.delete(todos).where(and({ id }, { user_id: userId }))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const userId = await getUserIdFromRequestHeaderToken(request)

  try {
    const { id, title, description, dueDate, isCompleted } =
      await request.json()
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await db
      .update(todos)
      .set({ title, description, dueDate, isCompleted })
      .where(and({ id }, { user_id: userId }))

    return NextResponse.json({ id, title, description, dueDate, isCompleted })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    )
  }
}
