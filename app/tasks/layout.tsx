import * as React from "react"

import TasksProvider from "@/context/TasksContext"

interface Props {
  children: React.ReactNode
}

const TasksLayout: React.FC<Props> = ({ children }) => {
  return <TasksProvider>{children}</TasksProvider>
}

export default TasksLayout
