// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Prisma, Category } from ".prisma/client"

const prisma = new PrismaClient()

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
        console.log(`ERROR | err`, err)
        res.status(500).json({ error: err })
      }
    } else {
      res.status(400).json({ error: "wrong input format" })
    }
  } else {
    res.status(400).json({ error: "wrong http method" })
  }
}
