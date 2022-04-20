// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Transaction } from ".prisma/client"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: Transaction[]
}

export default async function deleteTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "DELETE") {
    const { id } = req.query

    if (!Array.isArray(id)) {
      const ids_array = id.split(",")
      try {
        const deletedData = await prisma.$transaction(
          ids_array.map(id =>
            prisma.transaction.delete({
              where: {
                id: Number(id),
              },
            })
          )
        )
        res.json({ data: deletedData })
      } catch (err) {
        console.error(`ERROR | err`, err)
        res.status(500).json({ error: err })
      }
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}