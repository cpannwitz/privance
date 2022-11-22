// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiHandler } from 'next'
import { prisma } from '../../../shared/database'
import { CategoryWithTransactions } from '../../../types/types'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(getCategoryTransactions)
export default handler

async function getCategoryTransactions(
  req: NextApiRequest,
  res: NextApiResponseData<CategoryWithTransactions | null>
) {
  if (req.method !== API_METHOD.GET) {
    throw new API_EXCEPTION.WrongMethodException()
  }

  const { id } = req.query

  if (!id) {
    throw new API_EXCEPTION.BadRequestException()
  }
  try {
    const data = await prisma.category.findFirst({
      where: {
        id: Number(id)
      },
      include: {
        transactions: true,
        _count: true
      }
    })

    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Could not get category transactions`)
  }
}
