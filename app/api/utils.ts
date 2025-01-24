import { NextRequest, NextResponse } from "next/server"

import jwt from "jsonwebtoken"

export const getUserIdFromRequestHeaderToken = async (
  request: NextRequest
): Promise<number | NextResponse<{ error: string }>> => {
  const rawToken = request.headers.get("Authorization")
  if (!rawToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = rawToken.replace("Bearer ", "")
  try {
    const decoded = jwt.decode(token) as { id: number }
    return decoded.id
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
