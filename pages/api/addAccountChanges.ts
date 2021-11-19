// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"

import transformAccountChanges from "../../functions/transformAccountChanges"
import { AccountChangeWithCategories } from "../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: AccountChangeWithCategories[]
}

type RawData = string[][]

export default async function addAccountChanges(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const data = req.body as RawData

    const transformedData = await transformAccountChanges(data)

    try {
      const insertedData = await prisma.$transaction(
        transformedData.map(data =>
          prisma.accountChange.create({
            data: data,
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
