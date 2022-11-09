// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import { AutomationRuleWithCategory } from '../../../types/types'
import { prisma } from '../../../shared/database'

export type ResponseData = {
  error?: string
  data?: AutomationRuleWithCategory
}

export default async function updateAutomationRule(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'wrong http method' })
  }
  const automationRuleToUpdate = req.body as Prisma.AutomationRuleUpdateInput &
    Prisma.AutomationRuleWhereUniqueInput

  if (!automationRuleToUpdate.id || !automationRuleToUpdate.category) {
    return res.status(400).json({ error: 'missing' })
  }

  const { id, ...rest } = automationRuleToUpdate
  console.log(`LOG |  ~ file: updateAutomationRule.ts ~ line 27 ~ rest`, rest)

  try {
    const data = await prisma.automationRule.update({
      where: {
        id: id
      },
      data: rest,
      include: {
        category: true
      }
    })

    return res.json({ data })
  } catch (err) {
    console.error(`ERROR | updateAutomationRule: `, err)
    res.status(500).json({ error: 'Internal error | Could not update automation rule' })
  }
}
