// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiHandler } from 'next'
import { CategoryWithTransactions } from '../../../types/types'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) =>
  apiExceptionHandler(req, res)(getCategoriesTransactions)
export default handler

async function getCategoriesTransactions(
  req: NextApiRequest,
  res: NextApiResponseData<CategoryWithTransactions[]>
) {
  if (req.method !== API_METHOD.GET) {
    throw new API_EXCEPTION.WrongMethodException()
  }

  try {
    const data = await prisma.category.findMany({
      include: {
        transactions: true,
        _count: true
      }
    })

    res.json({
      data
    })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Could not get categories transactions`)
  }
}
