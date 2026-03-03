import type * as React from "react"
import Tasks from "@/components/Tasks"
import { generateMetadata } from "@/utils/metadata"

export const metadata = generateMetadata({
  path: "/tasks",
  title: "Tasks - Done Done",
  description: "A sleek and simple todo list app",
})

const TasksPage: React.FC = () => {
  return <Tasks />
}

export default TasksPage
