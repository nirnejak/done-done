import { NextResponse } from "next/server"

import { db } from "@/drizzle.config"
import { users } from "@/app/api/schema"
import { encryptPassword } from "@/utils/auth"

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
      .$returningId()
    return NextResponse.json({
      id: newUser[0].id,
      name,
      email,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to register" }, { status: 500 })
  }
}
