// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Transaction } from ".prisma/client"
import { prisma } from "../../../shared/database"

type ResponseData = {
  error?: any
  data?: Transaction
}

export default async function deleteTransaction(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "DELETE") {
    const { id } = req.query

    try {
      const data = await prisma.transaction.delete({
        where: {
          id: Number(id),
        },
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
