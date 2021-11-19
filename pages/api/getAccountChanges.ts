// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { AccountChangeWithCategories } from "../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: AccountChangeWithCategories[]
}

export default async function getAccountChanges(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.accountChange.findMany({ include: { categories: true } })

      res.json({ data })
    } catch (err) {
      console.log(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(400).json({ error: "wrong http method" })
  }
}
