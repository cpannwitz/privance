// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler, NextApiRequest } from 'next'
import { TransactionBeforeUpload, TransactionWithCategory } from '../../../types/types'
import { prisma } from '../../../shared/database'
import createTransactionIdentifier from '../../../shared/createTransactionIdentifier'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(addTransactions)
export default handler

async function addTransactions(
  req: NextApiRequest,
  res: NextApiResponseData<TransactionWithCategory[]>
) {
  if (req.method !== API_METHOD.POST) {
    throw new API_EXCEPTION.WrongMethodException()
  }

  const transactions = req.body as TransactionBeforeUpload[]

  if (!transactions || !Array.isArray(transactions)) {
    throw new API_EXCEPTION.BadRequestException()
  }

  const finalTransactions = transactions.map(transaction => ({
    ...transaction,
    category: transaction.category ? { connect: { id: transaction.category.id } } : undefined,
    identifier: createTransactionIdentifier(transaction)
  }))

  try {
    const data = await prisma.$transaction(
      finalTransactions.map(transaction =>
        prisma.transaction.upsert({
          where: {
            identifier: transaction.identifier ?? undefined
          },
          update: transaction,
          create: transaction,
          include: {
            category: true
          }
        })
      )
    )
    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Could not add transaction`)
  }
}
