"use client"
import * as React from "react"

const AuthForm: React.FC = () => {
  const [formState, setFormState] = React.useState("register")

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    setName("")
    setEmail("")
    setPassword("")
  }

  return (
    <div>
      <h1 className="capitalize">{formState}</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit" className="capitalize">
          {formState}
        </button>
      </form>
    </div>
  )
}

export default AuthForm
