// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Prisma, Category } from '.prisma/client'
import { prisma } from '../../../shared/database'

type ResponseData = {
  error?: string
  data?: Category
}

export default async function upsertCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'wrong http method' })
  }

  const categoryToUpsert = req.body as Prisma.CategoryUncheckedCreateInput

  if (!categoryToUpsert.name) {
    return res.status(400).json({ error: 'missing argument' })
  }

  try {
    if (categoryToUpsert.id) {
      const data = await prisma.category.update({
        where: {
          id: categoryToUpsert.id
        },
        data: categoryToUpsert
      })

      return res.json({ data })
    } else {
      const data = await prisma.category.create({
        data: categoryToUpsert
      })

      return res.json({ data })
    }
  } catch (err) {
    console.error(`ERROR | upsertCategory: `, err)
    res.status(500).json({ error: 'Internal error | Could not upsert category' })
  }
}
