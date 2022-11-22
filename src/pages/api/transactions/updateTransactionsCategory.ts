// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiHandler } from 'next'
import { TransactionWithCategory } from '../../../types/types'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) =>
  apiExceptionHandler(req, res)(updateTransactionsCategory)
export default handler

async function updateTransactionsCategory(
  req: NextApiRequest,
  res: NextApiResponseData<TransactionWithCategory[]>
) {
  if (req.method !== API_METHOD.PUT) {
    throw new API_EXCEPTION.WrongMethodException()
  }

  const transactionsToUpdate = req.body as (Prisma.TransactionWhereUniqueInput & {
    category?: number
  })[]

  if (!transactionsToUpdate || !Array.isArray(transactionsToUpdate)) {
    throw new API_EXCEPTION.BadRequestException()
  }

  try {
    const data = await prisma.$transaction(
      transactionsToUpdate.map(transaction =>
        prisma.transaction.update({
          where: {
            id: transaction.id
          },
          data: {
            category: {
              connect: transaction.category ? { id: transaction.category } : undefined
            }
          },
          include: {
            category: true
          }
        })
      )
    )

    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Could not update transactions categories`)
  }
}
