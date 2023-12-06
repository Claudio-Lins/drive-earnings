"use client"
import "@/lib/dayjs"
import { SessionProvider, SessionProviderProps } from "next-auth/react"

export const AuthProvider = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>
}
