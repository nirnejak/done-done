import type * as React from "react"
import AuthForm from "@/components/AuthForm"
import { generateMetadata } from "@/utils/metadata"

export const metadata = generateMetadata({
  path: "/",
  title: "Done Done",
  description: "A sleek and simple todo list app",
})

const Home: React.FC = () => {
  return (
    <section className="grid min-h-screen place-content-center">
      <AuthForm />
    </section>
  )
}

export default Home
