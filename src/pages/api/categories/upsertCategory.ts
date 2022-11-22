// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiHandler } from 'next'
import { Prisma, Category } from '@prisma/client'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(upsertCategory)
export default handler

async function upsertCategory(req: NextApiRequest, res: NextApiResponseData<Category>) {
  if (req.method !== API_METHOD.POST) {
    throw new API_EXCEPTION.WrongMethodException()
  }

  const categoryToUpsert = req.body as Prisma.CategoryUncheckedCreateInput

  if (!categoryToUpsert.name) {
    throw new API_EXCEPTION.BadRequestException()
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
    throw new API_EXCEPTION.InternalException(`Could not upsert category category`)
  }
}
