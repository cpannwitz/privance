// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { CategoriesStatistics } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: CategoriesStatistics
}

export default async function getCategoriesStatistics(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const uncategorizedTransactionsCount = await prisma.transaction.count({
        where: {
          categoryId: null,
        },
      })
      const allTransactionsCount = await prisma.transaction.count()

      res.json({
        data: {
          uncategorizedTransactionsCount,
          allTransactionsCount,
        },
      })
    } catch (err) {
      console.error(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
