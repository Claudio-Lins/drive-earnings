export interface TransactionTypes {
  id: string
  type: string
  entity: string
  paymentMethod: string
  recurring: string | null
  name: string
  amount: string
  location: string | null
  notes: string | null
  receipt: string | null
  bankAccount: string | null
  createdAt: Date
  updatedAt: Date
  userId: string | null
  categoryId: string | null
}
