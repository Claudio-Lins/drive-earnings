"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export function Profile() {
  const { data } = useSession()
  const [isOpened, setIsOpened] = useState(false)

  function toglePopover() {
    setIsOpened(!isOpened)
  }

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1.5, delay: 1.5 }}
      className={cn(
        "flex z-10 flex-col items-center justify-center top-4 right-4 fixed",
        !data && "hidden"
      )}
    >
      <Popover open={isOpened} onOpenChange={toglePopover}>
        <PopoverTrigger onClick={toglePopover}>
          <div className="flex flex-col items-center justify-center gap-2">
            <Avatar>
              <AvatarImage
                src={data?.user?.image ?? "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 rounded-lg border p-2">
            <strong className="text-center text-zinc-900">
              {data?.user?.name}
            </strong>
            {data?.user.role === "ADMIN" ? (
              <>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/admin"
                    onClick={toglePopover}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Dashboard Admin
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/admin/users"
                    onClick={toglePopover}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Profile
                  </Link>
                </div>
              </>
            ) : (
              <Link
                href="/profile"
                onClick={toglePopover}
                className={buttonVariants({ variant: "outline" })}
              >
                Conta Usuário
              </Link>
            )}

            <Button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              variant="destructive"
              className="text-left"
            >
              Sair
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}
