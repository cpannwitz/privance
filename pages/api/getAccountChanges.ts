// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, AccountChange } from ".prisma/client"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: AccountChange[]
}

export default async function getAccountChanges(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.accountChange.findMany()

      res.json({ data })
    } catch (err) {
      console.log(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(400).json({ error: "wrong http method" })
  }
}
