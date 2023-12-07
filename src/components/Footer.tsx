"use client"
// import { useModalEntranceStore } from "@/context/modal-entrance-store"
// import { ModalEntrace } from "./modal/ModalEntrace"
// import { Category } from "@/@types"
// import { UseAccountNav } from "./UseAccountNav"
import { cn } from "@/lib/utils"
import Entry from "./transaction/entry"
// import { SignOutBtn } from "./SignOutBtn"

interface FooterProps {
  session: any
}

export function Footer({ session }: FooterProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 bg-white backdrop-blur w-full h-14 rounded-b-xl flex items-center p-2 justify-center",
        !session?.user && "hidden"
      )}
    >
      <div className="flex items-center justify-evenly px-2 gap-2 w-full max-w-md">
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
        {/* <Link
          href="/new-transaction"
          className=" rounded-full flex items-center shadow-md bg-white justify-center p-2 -mt-10"
        >
          <PlusCircle className="w-12 h-12 font-medium " />
        </Link> */}
      </div>
    </div>
  )
}
