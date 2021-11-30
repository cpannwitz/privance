// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Prisma } from ".prisma/client"

import { TransactionWithCategories } from "../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategories[]
}

export default async function addTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const bodydata = req.body as Prisma.TransactionCreateInput[]

    try {
      const insertedData = await prisma.$transaction(
        bodydata.map(data =>
          prisma.transaction.upsert({
            where: {
              identifier: data.identifier ?? undefined,
            },
            update: data,
            create: data,
            include: { categories: true },
          })
        )
      )
      res.json({ data: insertedData })
    } catch (err) {
      console.error(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
