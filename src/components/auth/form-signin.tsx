"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
})

export type FormSigninValues = z.infer<typeof FormSchema>

export function FormSignin() {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<FormSigninValues>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })
    if (signInData?.error) {
      console.log(signInData.error)
    } else {
      router.refresh()
      router.push("/")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col space-y-4 px-6"
    >
      <div className="">
        <Label htmlFor="email">Email</Label>
        <Input type="email" {...register("email")} className="border rounded" />
      </div>
      <div className="">
        <Label htmlFor="password">Senha</Label>
        <Input type="password" {...register("password")} />
      </div>
      <Button type="submit">Entrar</Button>
      <Button onClick={() => signOut()} type="button">
        Sair
      </Button>
    </form>
  )
}
