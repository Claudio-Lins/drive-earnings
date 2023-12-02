import { FormRegister } from "@/components/auth/form-register"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  const session = await auth()

  if (session) redirect("/")
  return (
    <div className="w-full flex items-center justify-center bg-zinc-950 px-2 min-h-screen py-6">
      <div className="w-full max-w-sm rounded-lg bg-white px-2 py-6 flex items-center justify-center h-fit flex-col space-y-6">
        <header className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-2xl font-bold">Olá, crie sua conta.</h1>
          <p className="text-center w-ful px-4">
            Enter your email below to create your account.
          </p>
        </header>
        <FormRegister />
        <Separator className="w-full" />
        <div className="flex items-center justify-center space-x-2">
          <p className="text-sm">Já possuo cadastra?</p>
          <Link href="/signin" className="text-sm text-blue-500">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  )
}
