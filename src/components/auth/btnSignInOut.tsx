"use client"

import { signOut } from "next-auth/react"

export function BtnSignInOut() {
  return (
    <div className="">
      <button
        onClick={() => signOut()}
        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md"
      >
        Sair
      </button>
    </div>
  )
}
