"use client"
// import { useModalEntranceStore } from "@/context/modal-entrance-store"
// import { ModalEntrace } from "./modal/ModalEntrace"
// import { Category } from "@/@types"
// import { UseAccountNav } from "./UseAccountNav"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Home, Receipt } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Entry from "./transaction/entry"
// import { SignOutBtn } from "./SignOutBtn"

interface FooterProps {
  session: any
}

export function Footer({ session }: FooterProps) {
  // pathName
  const pathName = usePathname()
  return (
    <div
      className={cn(
        "fixed bottom-0 bg-white backdrop-blur w-full h-14 rounded-b-xl flex items-center p-2 justify-center",
        !session?.user && "hidden"
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 3 }}
        className="flex items-center justify-evenly px-2 gap-2 w-full max-w-md"
      >
        <Link
          href="/"
          className={cn(
            "rounded-full hover:scale-110 transition-all duration-300 flex items-center shadow-md bg-white justify-center p-2 -mt-10 w-12 h-12",
            pathName === "/" && "bg-gradient-to-r from-violet-600 to-red-500"
          )}
        >
          <Home
            className={cn(
              "w-6 h-6 font-medium ",
              pathName === "/" && "text-white"
            )}
          />
        </Link>
        <Entry />
        {/* <button className=" rounded-full flex items-center justify-center p-2 ">
          <Fuel className="w-6 h-6 font-medium " />
        </button>
        <div className=" rounded-full flex items-center justify-center p-2 ">
          {session?.user ? (
            <User2 className="w-6 h-6 font-medium " />
          ) : (
            <Link className={buttonVariants()} href="/sign-in">
              <LogIn className="w-6 h-6 font-medium" />
            </Link>
          )}
        </div> */}
        <Link
          href="/transactions"
          className={cn(
            "rounded-full hover:scale-110 transition-all duration-300 flex items-center shadow-md bg-white justify-center p-2 -mt-10 w-12 h-12",
            pathName === "/transactions" &&
              "bg-gradient-to-r from-violet-600 to-red-500"
          )}
        >
          <Receipt
            className={cn(
              "w-6 h-6 ",
              pathName === "/transactions" && "text-white"
            )}
          />
        </Link>
      </motion.div>
    </div>
  )
}
