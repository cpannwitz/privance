// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from '@prisma/client'
import { NextApiHandler, NextApiRequest } from 'next'
import { TransactionWithCategory } from '../../../types/types'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) =>
  apiExceptionHandler(req, res)(updateTransactionCategory)
export default handler

async function updateTransactionCategory(
  req: NextApiRequest,
  res: NextApiResponseData<TransactionWithCategory>
) {
  if (req.method !== API_METHOD.PUT) {
    throw new API_EXCEPTION.WrongMethodException()
  }

  const transactionToUpdate = req.body as Prisma.TransactionWhereUniqueInput & {
    category?: number
  }

  if (!transactionToUpdate.id) {
    throw new API_EXCEPTION.BadRequestException()
  }
  try {
    const data = await prisma.transaction.update({
      where: {
        id: transactionToUpdate.id
      },
      data: {
        category: {
          connect: transactionToUpdate.category ? { id: transactionToUpdate.category } : undefined,
          disconnect: !transactionToUpdate.category ? true : undefined
        }
      },
      include: {
        category: true
      }
    })

    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Could not update transaction category`)
  }
}
