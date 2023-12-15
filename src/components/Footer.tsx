"use client"
// import { useModalEntranceStore } from "@/context/modal-entrance-store"
// import { ModalEntrace } from "./modal/ModalEntrace"
// import { Category } from "@/@types"
// import { UseAccountNav } from "./UseAccountNav"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Home, Receipt } from "lucide-react"
import Link from "next/link"
import Entry from "./transaction/entry"
// import { SignOutBtn } from "./SignOutBtn"

interface FooterProps {
  session: any
}

export function Footer({ session }: FooterProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
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
          className=" rounded-full hover:scale-110 transition-all duration-300 flex items-center shadow-md bg-white justify-center p-2 -mt-10"
        >
          <Home className="w-8 h-8 font-medium " />
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
          className=" rounded-full hover:scale-110 transition-all duration-300 flex items-center shadow-md bg-white justify-center p-2 -mt-10"
        >
          <Receipt className="w-8 h-8 font-medium " />
        </Link>
      </motion.div>
    </motion.div>
  )
}
