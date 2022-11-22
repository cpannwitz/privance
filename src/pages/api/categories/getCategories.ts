// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category } from '@prisma/client'
import { NextApiRequest, NextApiHandler } from 'next'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(getCategories)
export default handler

async function getCategories(req: NextApiRequest, res: NextApiResponseData<Category[]>) {
  if (req.method !== API_METHOD.GET) {
    throw new API_EXCEPTION.WrongMethodException()
  }

  try {
    const data = await prisma.category.findMany()
    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Could not get categories`)
  }
}
