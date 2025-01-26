import { NextResponse } from "next/server"

import { db } from "@/drizzle.config"
import { users } from "@/app/api/schema"
import { encryptPassword, generateToken } from "@/utils/auth"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      )
    }

    const hashedPassword = await encryptPassword(password)

    const newUser = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning()

    const id = newUser[0].id
    const token = generateToken(id)
    return NextResponse.json({
      token,
      user: { id, name, email },
    })
  } catch (error: any) {
    if (
      typeof error.message === "string" &&
      error.message.includes("duplicate key value")
    ) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      )
    } else {
      return NextResponse.json({ error: "Failed to register" }, { status: 500 })
    }
  }
}
