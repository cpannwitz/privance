// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AutomationRule } from '@prisma/client'
import { prisma } from '../../../shared/database'

export type ResponseData = {
  error?: string
  data?: AutomationRule
}

export default async function deleteAutomationRule(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'wrong http method' })
  }
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'missing argument' })
  }

  try {
    const data = await prisma.automationRule.delete({
      where: {
        id: Number(id)
      }
    })
    res.json({ data })
  } catch (err) {
    console.error(`ERROR | deleteAutomationRule: `, err)
    res.status(500).json({ error: 'Internal error | Could not delete automation rule' })
  }
}
