"use client"
import * as React from "react"

import { motion, AnimatePresence } from "motion/react"

import { BASE_TRANSITION } from "@/utils/animation"
import classNames from "@/utils/classNames"
import useDynamicHeight from "@/hooks/useDynamicHeight"

const initialFormState = {
  name: "",
  email: "",
  password: "",
}

const AuthForm: React.FC = () => {
  const { ref, height } = useDynamicHeight()

  const [authState, setAuthState] = React.useState<"login" | "register">(
    "register"
  )
  const [formState, setFormState] = React.useState(initialFormState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (authState === "register") {
      // TODO: register user
    } else {
      // TODO: login user
    }

    setFormState(initialFormState)
  }

  return (
    <motion.div
      animate={{ height: height + 92 }}
      className="w-[320px] overflow-hidden rounded-3xl bg-neutral-200 p-2 shadow-heavy dark:bg-neutral-800 dark:shadow-md"
    >
      <motion.div
        animate={{ height: height + 40 }}
        className="overflow-hidden rounded-2xl bg-neutral-50 p-5 shadow-heavy dark:bg-neutral-900 dark:shadow-md"
      >
        <div ref={ref}>
          <h1 className="mb-1 text-xl font-semibold capitalize text-neutral-800 dark:text-neutral-200">
            {authState}
          </h1>
          <p className="mb-6 text-sm text-neutral-500">
            {authState === "register"
              ? "Enter your details to get started."
              : "Continue where you left off."}
          </p>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {authState === "register" && (
                <motion.div
                  transition={BASE_TRANSITION}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className={classNames(
                      "w-full rounded-lg border px-3 py-2 text-sm outline-none",
                      "bg-neutral-100 focus:border-neutral-300 text-neutral-600 placeholder:text-neutral-400",
                      "dark:bg-neutral-800 dark:focus:border-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500 dark:border-neutral-700"
                    )}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleInputChange}
              className={classNames(
                "w-full rounded-lg border px-3 py-2 text-sm outline-none",
                "bg-neutral-100 focus:border-neutral-300 text-neutral-600 placeholder:text-neutral-400",
                "dark:bg-neutral-800 dark:focus:border-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500 dark:border-neutral-700"
              )}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleInputChange}
              className={classNames(
                "w-full rounded-lg border px-3 py-2 text-sm outline-none",
                "bg-neutral-100 focus:border-neutral-300 text-neutral-600 placeholder:text-neutral-400",
                "dark:bg-neutral-800 dark:focus:border-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500 dark:border-neutral-700"
              )}
              minLength={8}
              required
            />

            <button
              type="submit"
              className="mt-2 rounded-lg bg-neutral-800 px-5 py-2 text-sm capitalize text-neutral-50 transition-all hover:bg-neutral-900 focus:bg-neutral-900 focus:outline-none active:scale-95 dark:bg-neutral-300 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
            >
              {authState}
            </button>
          </form>
        </div>
      </motion.div>
      <p className="mb-1 mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {authState === "register" ? (
          <span>
            Already have an account?{" "}
            <button
              onClick={() => {
                setAuthState("login")
              }}
              className="font-medium text-neutral-700 underline-offset-2 outline-none hover:underline focus:underline dark:text-neutral-300"
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
              className="font-medium text-neutral-700 underline-offset-2 outline-none hover:underline focus:underline dark:text-neutral-300"
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
