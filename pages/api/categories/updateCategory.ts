// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Prisma, Category } from ".prisma/client"
import { prisma } from "../../../shared/database"

type ResponseData = {
  error?: any
  data?: Category
}

export default async function updateCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const bodydata = req.body as Prisma.CategoryUpdateInput & Prisma.CategoryWhereUniqueInput

    if (bodydata.id) {
      try {
        const insertedData = await prisma.category.update({
          where: {
            id: bodydata.id,
          },
          data: {
            name: bodydata.name,
            transactions: bodydata.transactions,
          },
        })

        res.json({ data: insertedData })
      } catch (err) {
        console.error(`ERROR | err`, err)
        res.status(500).json({ error: err })
      }
    } else {
      res.status(400).json({ error: "missing category id" })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
