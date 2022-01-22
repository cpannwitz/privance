// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"

import { TransactionBeforeUpload, TransactionWithCategory } from "../../../types/types"

function createIdentifier(transaction: TransactionBeforeUpload) {
  return (
    (new Date(transaction.issuedate!)?.getTime() || 0) +
    (transaction.balance || 0) +
    (transaction.amount || 0)
  )
}

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategory[]
}

export default async function addTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const transactions = req.body as TransactionBeforeUpload[]

    const finalTransactions = transactions.map(transaction => ({
      ...transaction,
      category: transaction.category ? { connect: { id: transaction.category.id } } : undefined,
      identifier: createIdentifier(transaction),
    }))

    try {
      const insertedData = await prisma.$transaction(
        finalTransactions.map(data =>
          prisma.transaction.upsert({
            where: {
              identifier: data.identifier ?? undefined,
            },
            update: data,
            create: data,
            include: { category: true, _count: true },
          })
        )
      )
      res.json({ data: insertedData })
    } catch (err) {
      console.error(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
