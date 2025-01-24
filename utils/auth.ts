import bcryptUtils from "bcryptjs"
import jwt from "jsonwebtoken"

export const encryptPassword = async (password: string): Promise<string> => {
  return await bcryptUtils.hash(password, 8)
}

export const comparePassword = async (
  inputPassword: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcryptUtils.compare(inputPassword, hashPassword)
}

export const generateToken = (id: string) => {
  const secretKey = process.env.SECRET_KEY || "default-secret-key"
  const expiresIn = Number(process.env.EXPIRE_TIME) || 3600

  return `Bearer ${jwt.sign({ id }, secretKey, { expiresIn })}`
}
