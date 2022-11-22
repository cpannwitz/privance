// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiHandler } from 'next'
import { CategoriesStatistics } from '../../../types/types'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(getCategoriesStatistics)
export default handler

async function getCategoriesStatistics(
  req: NextApiRequest,
  res: NextApiResponseData<CategoriesStatistics>
) {
  if (req.method !== API_METHOD.GET) {
    throw new API_EXCEPTION.WrongMethodException()
  }

  try {
    const uncategorizedTransactionsCount = await prisma.transaction.count({
      where: {
        categoryId: null
      }
    })
    const allTransactionsCount = await prisma.transaction.count()

    res.json({
      data: {
        uncategorizedTransactionsCount,
        allTransactionsCount
      }
    })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Could not get categories statistics`)
  }
}
