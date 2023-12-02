import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { getSession } from "next-auth/react"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const data = await request.json()
  const { name, password, email } = data

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Dados incompletos" })
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (isUserExist) {
    return NextResponse.json({ message: "Usuário já existe" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}

export async function GET() {
  const session = await getSession()
  const userId = session?.user?.id
  const users = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    // include: {
    //   orders: true,
    // },
  })
  return NextResponse.json(users)
}
