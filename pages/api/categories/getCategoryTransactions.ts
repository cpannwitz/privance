// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { CategoryWithTransactions } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: CategoryWithTransactions | null
}

export default async function getCategoryTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { categoryId } = req.query
    try {
      const data = await prisma.category.findFirst({
        where: {
          id: Number(categoryId),
        },
        include: {
          transactions: true,
        },
      })
      res.json({ data })
    } catch (err) {
      console.log(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(400).json({ error: "wrong http method" })
  }
}
