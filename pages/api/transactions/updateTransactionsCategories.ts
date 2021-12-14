// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Prisma } from ".prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { TransactionWithCategories } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategories[]
}

// TODO: combine with "updateTransactionCategories"

export default async function updateTransactionsCategories(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const bodydata = req.body as (Prisma.TransactionWhereUniqueInput & {
      categoriesConnect?: number[]
      categoriesDisconnect?: number[]
    })[]

    try {
      const insertedData = await prisma.$transaction(
        bodydata.map(data =>
          prisma.transaction.update({
            where: {
              id: data.id,
            },
            data: {
              categories: {
                connect: data.categoriesConnect
                  ? data.categoriesConnect.map(cat => ({ id: cat }))
                  : undefined,
                disconnect: data.categoriesDisconnect
                  ? data.categoriesDisconnect.map(cat => ({ id: cat }))
                  : undefined,
              },
            },
            include: {
              categories: true,
            },
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
