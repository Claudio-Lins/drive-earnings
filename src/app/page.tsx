import { ButtonSignout } from "@/components/auth/button-signout"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/signin")
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24
    bg-zinc-950 text-white"
    >
      <pre>{<code>{JSON.stringify(session, null, 2)}</code>}</pre>
      <ButtonSignout />
    </main>
  )
}
