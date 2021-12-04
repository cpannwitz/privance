// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { TransactionWithCategories } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategories[]
}

export default async function getTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.transaction.findMany({
        orderBy: { issuedate: "desc" },
        include: { categories: true, _count: true },
      })
      res.json({ data })
    } catch (err) {
      console.error(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
