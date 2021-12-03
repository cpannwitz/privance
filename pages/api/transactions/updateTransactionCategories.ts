// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Prisma } from ".prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { TransactionWithCategories } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategories
}

export default async function updateTransactionCategories(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const bodydata = req.body as Prisma.TransactionWhereUniqueInput & {
      categoriesConnect?: number[]
      categoriesDisconnect?: number[]
    }

    if (bodydata.id) {
      try {
        const insertedData = await prisma.transaction.update({
          where: {
            id: bodydata.id,
          },
          data: {
            categories: {
              connect: bodydata.categoriesConnect
                ? bodydata.categoriesConnect.map(cat => ({ id: cat }))
                : undefined,
              disconnect: bodydata.categoriesDisconnect
                ? bodydata.categoriesDisconnect.map(cat => ({ id: cat }))
                : undefined,
            },
          },
          include: {
            categories: true,
          },
        })

        res.json({ data: insertedData })
      } catch (err) {
        console.error(`ERROR | err`, err)
        res.status(500).json({ error: err })
      }
    } else {
      res.status(400).json({ error: "missing transaction id" })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
