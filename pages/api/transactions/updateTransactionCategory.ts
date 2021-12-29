// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Prisma } from ".prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { TransactionWithCategory } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategory
}

export default async function updateTransactionCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const bodydata = req.body as Prisma.TransactionWhereUniqueInput & {
      category?: number
    }

    if (bodydata.id) {
      try {
        const insertedData = await prisma.transaction.update({
          where: {
            id: bodydata.id,
          },
          data: {
            category: {
              connect: bodydata.category ? { id: bodydata.category } : undefined,
              disconnect: !bodydata.category ? true : undefined,
            },
          },
          include: {
            category: true,
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
