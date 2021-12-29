// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Prisma } from ".prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { TransactionWithCategory } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategory[]
}

export default async function updateTransactionsCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const bodydata = req.body as (Prisma.TransactionWhereUniqueInput & {
      categoryConnect?: number
      // categoryDisconnect?: number
    })[]

    try {
      const insertedData = await prisma.$transaction(
        bodydata.map(data =>
          prisma.transaction.update({
            where: {
              id: data.id,
            },
            data: {
              category: {
                connect: data.categoryConnect ? { id: data.categoryConnect } : undefined,
                // disconnect: data.categoryDisconnect
                //   ? { id: data.categoryDisconnect }
                //   : undefined,
              },
            },
            include: {
              category: true,
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
