import { FormSignin } from "@/components/auth/form-signin"
import { GoogleButton } from "@/components/auth/google-button"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const session = await auth()

  if (session) redirect("/")
  return (
    <div className="w-full flex items-center justify-center bg-zinc-950 px-2 min-h-screen py-6">
      <div className="w-full max-w-sm rounded-lg bg-white px-2 py-6 flex items-center justify-center h-fit flex-col space-y-6">
        <header className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-2xl font-bold">Bem-vindo(a)</h1>
          <p className="text-center w-ful px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </header>
        <GoogleButton />
        <small>ou entrar com email</small>
        <FormSignin />
        <Separator className="w-full" />
        <div className="flex items-center justify-center space-x-2">
          <p className="text-sm">Ainda não é cadastrado?</p>
          <Link href="/register" className="text-sm text-blue-500">
            Registrar
          </Link>
        </div>
      </div>
    </div>
  )
}
