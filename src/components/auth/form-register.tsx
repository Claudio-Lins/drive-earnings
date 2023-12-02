"use client"

import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "../ui/use-toast"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface IUserProps {
  name: string
  email: string
  password: string
}

export function FormRegister({ className, ...props }: UserLoginFormProps) {
  const router = useRouter()
  const [data, setData] = useState<IUserProps>({
    name: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const response = await request.json()

    if (!request.ok) {
      toast({
        title: "Erro ao criar usuário",
        description: response.message,
      })
    } else {
      toast({
        title: "Usuário criado com sucesso",
        description: "Você será redirecionado para a página de login.",
      })
      router.push("/signin")
    }

    setData({
      name: "",
      email: "",
      password: "",
    })
    setIsLoading(false)
  }

  function handleChance(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col space-y-4 px-6">
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="name">
            Nome
          </Label>
          <Input
            id="Name"
            type="text"
            placeholder="Nome completo"
            disabled={isLoading}
            name="name"
            value={data.name}
            onChange={handleChance}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="Email"
            type="email"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
            name="email"
            value={data.email}
            onChange={handleChance}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            autoCorrect="off"
            disabled={isLoading}
            name="password"
            value={data.password}
            onChange={handleChance}
          />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Registrar
        </Button>
      </div>
    </form>
  )
}
