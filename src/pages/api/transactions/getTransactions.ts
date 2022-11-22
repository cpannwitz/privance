// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler, NextApiRequest } from 'next'
import { prisma } from '../../../shared/database'
import sortTransactions from '../../../shared/sortTransactions'
import { TransactionWithCategory } from '../../../types/types'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(getTransactions)
export default handler

async function getTransactions(
  req: NextApiRequest,
  res: NextApiResponseData<TransactionWithCategory[]>
) {
  if (req.method !== API_METHOD.GET) {
    throw new API_EXCEPTION.WrongMethodException()
  }
  try {
    const data = await prisma.transaction.findMany({
      include: { category: true }
    })
    const sortedData = sortTransactions(data, 'desc')
    res.json({ data: sortedData })
  } catch {
    throw new API_EXCEPTION.InternalException(`Couldn't fetch transactions`)
  }
}
