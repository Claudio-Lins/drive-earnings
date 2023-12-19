import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="relative inset-0 flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950">
      <div className="mb-6 flex items-center justify-center"></div>
      <Loader className="text-white w-10 h-10 animate-spin" />
    </div>
  )
}
