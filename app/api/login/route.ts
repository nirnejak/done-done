import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { users } from "@/app/api/schema"
import { comparePassword, generateToken } from "@/utils/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const result = await db.select().from(users).where(eq(users.email, email))

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }
    const user = result[0]

    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = generateToken(user.id)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
