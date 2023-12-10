import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Erro ao buscar Categorias" })
  }
}

// POST
export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const category = await prisma.category.create({
      data: {
        name: body.name,
        color: body.color,
        icon: body.icon,
        type: body.type,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Erro ao criar Categoria" })
  }
}
