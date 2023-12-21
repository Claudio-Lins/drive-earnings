import { TransactionTypes } from "@/@types/transaction"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface CardTransactionProps {
  transaction: TransactionTypes
}

// notes: string | null
// receipt: string | null
// bankAccount: string | null

export function CardTransaction({ transaction }: CardTransactionProps) {
  return (
    <Card>
      <CardContent className="flex flex-col space-y-2 mt-4">
        <div className="flex items-center gap-1">
          <strong>Tipo de entidade:</strong>
          <span>{transaction.entity}</span>
        </div>
        <div className="flex items-center gap-1">
          <strong>Tipo de tranasação:</strong>
          <span>{transaction.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <strong>Metodo de pagamento:</strong>
          <span>{transaction.paymentMethod}</span>
        </div>
        <div className="flex items-center gap-1">
          <strong>Recorrência:</strong>
          <span>{transaction.recurring}</span>
        </div>
        <div className="flex items-center gap-1">
          <strong>Local:</strong>
          <span>{transaction.location || "Não indicado"}</span>
        </div>
        <div className="flex items-center gap-1">
          <strong>Nota:</strong>
          <span>{transaction.notes || "Não indicado"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <strong>Recibo:</strong>
          <Image
            src={transaction.receipt || "/assets/receipt.svg"}
            width={100}
            height={100}
            alt="receipt"
          />
        </div>
      </CardContent>
    </Card>
  )
}
