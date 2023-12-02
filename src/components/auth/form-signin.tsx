"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function FormSignin() {
  return (
    <form className="w-full flex flex-col space-y-4 px-6">
      <div className="">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          className="border rounded"
        />
      </div>
      <div className="">
        <Label htmlFor="password">Senha</Label>
        <Input type="password" name="password" id="password" />
      </div>
      <Button type="submit">Entrar</Button>
    </form>
  )
}
