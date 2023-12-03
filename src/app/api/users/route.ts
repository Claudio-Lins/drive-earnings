import prisma from "@/lib/prisma"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, password, email } = body

  const isEmailValid = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if (isEmailValid) {
    return NextResponse.json({ message: "Email inválido" })
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
