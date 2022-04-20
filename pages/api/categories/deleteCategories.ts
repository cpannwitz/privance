// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Category } from ".prisma/client"
import { prisma } from "../../../shared/database"

type ResponseData = {
  error?: any
  data?: Category[]
}

export default async function deleteCategories(
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
            prisma.category.delete({
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
