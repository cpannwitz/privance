// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Category } from ".prisma/client"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: Category
}

export default async function deleteCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "DELETE") {
    const { id } = req.query

    try {
      const data = await prisma.category.delete({
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
