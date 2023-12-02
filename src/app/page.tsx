import { ButtonSignout } from "@/components/auth/button-signout"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (!session) redirect("/signin")

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24
    bg-zinc-950"
    >
      <h1 className="font-bold text-4xl text-zinc-50 ">
        {session?.user?.email ?? "No email"}
      </h1>
      <ButtonSignout />
    </main>
  )
}
