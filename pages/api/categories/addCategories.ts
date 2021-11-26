// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Prisma, Category } from ".prisma/client"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: Category[]
}

export default async function addCategories(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const bodydata = req.body as Prisma.CategoryCreateInput[]

    try {
      const insertedData = await prisma.$transaction(
        bodydata.map(data =>
          prisma.category.create({
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
