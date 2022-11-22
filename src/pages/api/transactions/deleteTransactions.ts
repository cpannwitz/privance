// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler, NextApiRequest } from 'next'
import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'
import { Transaction } from '@prisma/client'
import { prisma } from '../../../shared/database'

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(deleteTransactions)
export default handler

async function deleteTransactions(req: NextApiRequest, res: NextApiResponseData<Transaction[]>) {
  if (req.method !== API_METHOD.DELETE) {
    throw new API_EXCEPTION.WrongMethodException()
  }

  const { ids } = req.body as { ids: number[] }

  if (!ids) {
    throw new API_EXCEPTION.BadRequestException()
  }

  try {
    const data = await prisma.$transaction(
      ids.map(id =>
        prisma.transaction.delete({
          where: {
            id: Number(id)
          }
        })
      )
    )
    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Could not delete transactions`)
  }
}
