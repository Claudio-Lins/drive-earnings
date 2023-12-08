import { UploadButton } from "@/utils/uploadthing"

interface UploadReciveProps {
  setReceiptUrl: (url: string) => void
}

export function UploadRecive({ setReceiptUrl }: UploadReciveProps) {
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res)
          setReceiptUrl(res[0].url)
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`)
        }}
      />
    </div>
  )
}
