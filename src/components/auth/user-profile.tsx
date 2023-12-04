import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { BtnSignInOut } from "./btnSignInOut"

export async function UserProfile() {
  const session = await getServerSession(authOptions)
  return (
    <div className="absolute top-4 right-4">
      {session ? (
        <BtnSignInOut />
      ) : (
        <div className="text-white">Not logged in</div>
      )}
    </div>
  )
}
