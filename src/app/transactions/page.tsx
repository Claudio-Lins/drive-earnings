import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed53f",
      amount: 300,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed51f",
      amount: 300,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed51f",
      amount: 300,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed31f",
      amount: 300,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed41f",
      amount: 300,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed61f",
      amount: 300,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "748ed61f",
      amount: 300,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "725ed61f",
      amount: 300,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function TransactionsPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
