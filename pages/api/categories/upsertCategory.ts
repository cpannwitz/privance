// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Prisma, Category } from ".prisma/client"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: Category
}

export default async function upsertCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const bodydata = req.body as Prisma.CategoryUncheckedCreateInput

    if (!bodydata.name) {
      return res.status(400).json({ error: "Missing name argument" })
    }

    if (bodydata.id) {
      try {
        const insertedData = await prisma.category.update({
          where: {
            id: bodydata.id,
          },
          data: bodydata,
        })

        return res.json({ data: insertedData })
      } catch (err) {
        console.error(`ERROR | err`, err)
        return res.status(500).json({ error: err })
      }
    } else {
      try {
        const insertedData = await prisma.category.create({
          data: bodydata,
        })

        return res.json({ data: insertedData })
      } catch (err) {
        console.error(`ERROR | err`, err)
        return res.status(500).json({ error: err })
      }
    }
  } else {
    return res.status(405).json({ error: "wrong http method" })
  }
}
