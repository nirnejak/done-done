"use client"
import * as React from "react"

import { SignOut } from "akar-icons"
import { toast } from "sonner"

const initialUser = {
  name: "",
  email: "",
  isAuthenticated: false,
}

export interface UserType {
  name: string
  email: string
  isAuthenticated: boolean
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

  const registerUser = (
    name: string,
    email: string,
    password: string
  ): void => {
    setUser((user) => {
      const newUser = {
        ...user,
        name,
        email,
        isAuthenticated: true,
      }

      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(newUser))
      toast.success("Registered successfully, Logging in")

      return newUser
    })
  }

  const loginUser = (email: string, password: string): void => {
    setUser((user) => {
      const newUser = {
        ...user,
        name: "Jeet",
        email,
        isAuthenticated: true,
      }
      localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(newUser))
      toast.success("Logged in successfully")

      return newUser
    })
  }

  const logoutUser = (): void => {
    setUser(user)
    localStorage.setItem(LOCAL_STORAGE_FIELD, JSON.stringify(user))
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
