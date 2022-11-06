// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { TransactionBeforeUpload, TransactionWithCategory } from '../../../types/types'
import { prisma } from '../../../shared/database'
import createTransactionIdentifier from '../../../shared/createTransactionIdentifier'

export type ResponseData = {
  error?: string
  data?: TransactionWithCategory[]
}

export default async function addTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'wrong http method' })
  }

  const transactions = req.body as TransactionBeforeUpload[]

  if (!transactions || !Array.isArray(transactions)) {
    return res.status(400).json({ error: 'missing argument' })
  }

  const finalTransactions = transactions.map(transaction => ({
    ...transaction,
    category: transaction.category ? { connect: { id: transaction.category.id } } : undefined,
    identifier: createTransactionIdentifier(transaction)
  }))

  try {
    const insertedData = await prisma.$transaction(
      finalTransactions.map(data =>
        prisma.transaction.upsert({
          where: {
            identifier: data.identifier ?? undefined
          },
          update: data,
          create: data,
          include: {
            category: true
          }
        })
      )
    )
    res.json({ data: insertedData })
  } catch (err) {
    console.error(`ERROR | addTransactions: `, err)
    res.status(500).json({ error: 'Internal error | Could not add transactions' })
  }
}
