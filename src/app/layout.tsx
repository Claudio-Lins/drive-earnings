import { Footer } from "@/components/Footer"
import { Profile } from "@/components/auth/Profile"
import { Toaster } from "@/components/ui/toaster"
import { authOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/providers/auth"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={cn("min-h-screen antialiased", inter.className)}>
        <AuthProvider>
          <main>
            <Profile />
            {children}
            <Footer session={session} />
            <Toaster />
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
