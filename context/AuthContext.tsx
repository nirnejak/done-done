"use client"
import * as React from "react"

import { SignOut } from "akar-icons"
import { toast } from "sonner"
import { redirect } from "next/navigation"

const initialUser = {
  name: "",
  email: "",
  token: "",
}

export interface UserType {
  name: string
  email: string
  token: string
}

export interface AUTH_CONTEXT {
  user: UserType
  registerUser: (name: string, email: string, password: string) => void
  loginUser: (name: string, email: string) => void
  logoutUser: () => void
}

export const AuthContext = React.createContext<AUTH_CONTEXT | null>(null)

interface Props {
  children: React.ReactNode
}

const LOCAL_STORAGE_FIELD = "user"

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<UserType>(initialUser)

  React.useEffect(() => {
    const localUser = localStorage.getItem(LOCAL_STORAGE_FIELD)
    if (localUser !== null) {
      setUser(JSON.parse(localUser) as UserType)
    }
  }, [])

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()

      if (data.token) {
        setUser((user) => {
          const newUser = {
            ...user,
            name,
            email,
            token: data.token,
          }
          localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(newUser))
          toast.success("Registered successfully, logging in")

          return newUser
        })
        redirect("/tasks")
      }
    } catch (error) {
      console.error(error)
      toast.error("Registration failed")
    }
  }

  const loginUser = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (data.token) {
        setUser((user) => {
          const newUser = {
            ...user,
            name: data.user.name,
            email,
            token: data.token,
          }
          localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(newUser))
          toast.success("Logged in successfully")

          return newUser
        })
        redirect("/tasks")
      }
    } catch (error) {
      console.error(error)
      toast.error("Registration failed")
    }
  }

  const logoutUser = (): void => {
    setUser(initialUser)
    localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(initialUser))
    toast("Logged out", {
      icon: <SignOut size={15} />,
    })
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = (): AUTH_CONTEXT => {
  const context = React.useContext(AuthContext)
  if (context === null)
    throw new Error("useAuth must be used within a AuthProvider")
  return context
}
