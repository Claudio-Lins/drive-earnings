"use client"

import { signOut } from "next-auth/react"

export function ButtonSignout() {
  return (
    <button
      className="bg-red-600 text-white px-4 py-2 rounded"
      onClick={() => signOut({ callbackUrl: "/signin" })}
    >
      Signout
    </button>
  )
}
