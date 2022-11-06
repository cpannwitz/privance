// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest } from 'next'
import { apiDir } from '../../../shared/apiDir'
import {
  type NextApiResponseData,
  withExceptionFilter,
  withMethodsGuard,
  withMiddleware
} from '../../../shared/apiHelpers'

import { prisma } from '../../../shared/database'
import sortTransactions from '../../../shared/sortTransactions'

export default function handler(req: NextApiRequest, res: NextApiResponseData<typeof api.type>) {
  return withExceptionFilter(req, res)(withMiddleware(withMethodsGuard(api.method), apiFunction))
}

const api = apiDir.transactions.getTransactions

async function apiFunction(_req: NextApiRequest, res: NextApiResponseData<typeof api.type>) {
  const data = await prisma.transaction.findMany({
    include: { category: true }
  })
  const sortedData = sortTransactions(data, 'desc')
  res.json({ data: sortedData })
}
