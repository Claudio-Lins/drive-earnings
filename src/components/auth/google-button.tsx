"use client"

import { signIn } from "next-auth/react"
import { GoogleColor } from "../icons/google-colors"
import { Button } from "../ui/button"

export function GoogleButton() {
  return (
    <Button
      variant={"outline"}
      className="flex items-center justify-center space-x-2 py-3 px-6 h-fit w-4/5"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <GoogleColor className="w-7 h-7" />
      <span className="font-bold">Entrar com o Google</span>
    </Button>
  )
}
