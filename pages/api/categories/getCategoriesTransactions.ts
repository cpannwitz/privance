// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../shared/database"
import { CategoryWithTransactions } from "../../../types/types"

type ResponseData = {
  error?: any
  data?: CategoryWithTransactions[]
}

export default async function getCategoriesTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.category.findMany({
        include: {
          transactions: true,
          _count: true,
        },
      })

      res.json({
        data,
      })
    } catch (err) {
      console.error(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
