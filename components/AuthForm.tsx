"use client"
import * as React from "react"
import { redirect } from "next/navigation"

import { motion, AnimatePresence } from "motion/react"
import { ArrowClockwise } from "akar-icons"

import { BASE_TRANSITION } from "@/utils/animation"
import classNames from "@/utils/classNames"
import useDynamicHeight from "@/hooks/useDynamicHeight"
import { useAuth } from "@/context/AuthContext"

const initialFormState = {
  name: "",
  email: "",
  password: "",
}

const AuthForm: React.FC = () => {
  const { isLoading, user, registerUser, loginUser } = useAuth()

  const { ref, height } = useDynamicHeight()

  const [authState, setAuthState] = React.useState("register")
  const [formState, setFormState] = React.useState(initialFormState)

  React.useEffect(() => {
    if (user.token.length > 0) {
      redirect("/tasks")
    }
  }, [user.token])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const { name, email, password } = formState
    if (authState === "register") {
      registerUser(name, email, password)
    } else {
      loginUser(email, password)
    }
  }

  return (
    <motion.div
      animate={{ height: height + 92 }}
      className="
        w-[320px] overflow-hidden rounded-3xl bg-neutral-200 p-2 shadow-heavy
        dark:bg-neutral-800 dark:shadow-md
      "
    >
      <motion.div
        animate={{ height: height + 40 }}
        className="
          overflow-hidden rounded-2xl bg-neutral-50 p-5 shadow-heavy
          dark:bg-neutral-900 dark:shadow-md
        "
      >
        <div ref={ref}>
          <h1
            className="
              mb-1 text-xl font-semibold text-neutral-800 capitalize
              dark:text-neutral-200
            "
          >
            {authState}
          </h1>
          <p className="mb-6 text-sm text-neutral-500">
            {authState === "register"
              ? "Enter your details to get started."
              : "Continue where you left off."}
          </p>

          <motion.form
            layout
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {authState === "register" && (
                <motion.div
                  layout
                  transition={BASE_TRANSITION}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className={classNames(
                      "w-full rounded-lg border px-3 py-2 text-sm outline-hidden",
                      "bg-neutral-100 focus:border-neutral-400 text-neutral-600 placeholder:text-neutral-400 border-neutral-200",
                      "dark:bg-neutral-800 dark:focus:border-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500 dark:border-neutral-700"
                    )}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.input
              layout
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleInputChange}
              className={classNames(
                "w-full rounded-lg border px-3 py-2 text-sm outline-hidden",
                "bg-neutral-100 focus:border-neutral-400 text-neutral-600 placeholder:text-neutral-400 border-neutral-200",
                "dark:bg-neutral-800 dark:focus:border-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500 dark:border-neutral-700"
              )}
              required
            />
            <motion.input
              layout
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleInputChange}
              className={classNames(
                "w-full rounded-lg border px-3 py-2 text-sm outline-hidden",
                "bg-neutral-100 focus:border-neutral-400 text-neutral-600 placeholder:text-neutral-400 border-neutral-200",
                "dark:bg-neutral-800 dark:focus:border-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500 dark:border-neutral-700"
              )}
              minLength={8}
              required
            />

            <motion.button
              layout="position"
              type="submit"
              disabled={isLoading}
              className="
                mt-2 flex items-center justify-center gap-2 rounded-lg
                bg-neutral-800 px-5 py-2 text-sm text-neutral-50 capitalize
                transition-all
                hover:bg-neutral-900
                focus:bg-neutral-900 focus:outline-hidden
                active:scale-95
                disabled:opacity-80
                dark:bg-neutral-300 dark:text-neutral-900
                dark:hover:bg-neutral-200
                dark:focus:bg-neutral-200
              "
            >
              {authState}
              {isLoading && (
                <ArrowClockwise className="animate-spin" size={12} />
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
      <p
        className="
          mt-3 mb-1 text-center text-sm text-neutral-500
          dark:text-neutral-400
        "
      >
        {authState === "register" ? (
          <span>
            Already have an account?{" "}
            <button
              onClick={() => {
                setAuthState("login")
              }}
              className="
                font-medium text-neutral-700 underline-offset-2 outline-hidden
                hover:underline
                focus:underline
                dark:text-neutral-300
              "
            >
              Login
            </button>
          </span>
        ) : (
          <span>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => {
                setAuthState("register")
              }}
              className="
                font-medium text-neutral-700 underline-offset-2 outline-hidden
                hover:underline
                focus:underline
                dark:text-neutral-300
              "
            >
              Register
            </button>
          </span>
        )}
      </p>
    </motion.div>
  )
}

export default AuthForm
