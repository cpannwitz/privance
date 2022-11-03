// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { CategoriesStatistics } from '../../../types/types'
import { prisma } from '../../../shared/database'

type ResponseData = {
  error?: string
  data?: CategoriesStatistics
}

export default async function getCategoriesStatistics(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' })
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
    console.error(`ERROR | getCategoriesStatistics: `, err)
    res.status(500).json({ error: 'Internal error | Could not get categories statistics' })
  }
}
