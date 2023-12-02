import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  const session = await auth()

  if (session) redirect("/")
  return (
    <div>
      <h1>Register</h1>
    </div>
  )
}
