// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { NextApiRequest, NextApiResponse } from "next"
import { Category } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../shared/database'

export type ResponseData = {
  error?: string
  data?: Category[]
}

export default async function getCategories(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' })
  }

  try {
    const data = await prisma.category.findMany()
    res.json({ data })
  } catch (err) {
    console.error(`ERROR | getCategories: `, err)
    res.status(500).json({ error: 'Internal error | Could not get categories' })
  }
}
