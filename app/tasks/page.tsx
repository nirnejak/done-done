import * as React from "react"

import { generateMetadata } from "@/utils/metadata"

import Tasks from "@/components/Tasks"

export const metadata = generateMetadata({
  path: "/tasks",
  title: "Tasks - Done Done",
  description: "A sleek and simple todo list app",
})

const TasksPage: React.FC = () => {
  return <Tasks />
}

export default TasksPage
