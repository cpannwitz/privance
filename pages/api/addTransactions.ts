// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"

import transformTransactions from "../../functions/transformTransactions"
import { TransactionWithCategories } from "../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategories[]
}

type RawData = string[][]

export default async function addTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const data = req.body as RawData

    const transformedData = await transformTransactions(data)

    try {
      const insertedData = await prisma.$transaction(
        transformedData.map(data =>
          prisma.transaction.create({
            data: data,
            include: { categories: true },
          })
        )
      )
      res.json({ data: insertedData })
    } catch (err) {
      console.log(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(400).json({ error: "wrong http method" })
  }
}
