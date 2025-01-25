"use client"
import * as React from "react"

import { motion } from "motion/react"

import { BASE_TRANSITION } from "@/utils/animation"

interface Props {
  title: string
  children: React.ReactNode
  closeModal: () => void
}

const Modal: React.FC<Props> = ({ title, children, closeModal }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={BASE_TRANSITION}
        role="button"
        tabIndex={0}
        onKeyUp={(e) => {
          e.stopPropagation()
          e.key === "Escape" && closeModal()
        }}
        onClick={(e) => {
          e.stopPropagation()
          closeModal()
        }}
        className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/10 backdrop-blur-xs"
      />
      <motion.div
        initial={{
          opacity: 0,
          translateX: "-50%",
          translateY: "-40%",
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          translateX: "-50%",
          translateY: "-50%",
          scale: 1,
        }}
        exit={{
          opacity: 0,
          translateX: "-50%",
          translateY: "-40%",
          scale: 0.95,
        }}
        transition={BASE_TRANSITION}
        className="fixed left-1/2 top-1/2 z-50 w-[500px] origin-center rounded-3xl bg-neutral-200 p-2 shadow-heavy dark:bg-neutral-800 dark:shadow-md"
      >
        <div className="rounded-2xl bg-neutral-50 p-5 shadow-heavy dark:bg-neutral-900 dark:shadow-md">
          <p className="mb-6 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            {title}
          </p>
          {children}
        </div>
      </motion.div>
    </>
  )
}

export default Modal
