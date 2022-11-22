// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiHandler } from 'next'
import { Prisma } from '@prisma/client'
import { AutomationRuleWithCategory } from '../../../types/types'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(upsertAutomationRule)
export default handler

async function upsertAutomationRule(
  req: NextApiRequest,
  res: NextApiResponseData<AutomationRuleWithCategory>
) {
  if (req.method !== API_METHOD.POST) {
    throw new API_EXCEPTION.WrongMethodException()
  }
  const automationRuleToUpsert = req.body as Prisma.AutomationRuleUncheckedCreateInput

  if (!automationRuleToUpsert.value || !automationRuleToUpsert.categoryId) {
    throw new API_EXCEPTION.BadRequestException()
  }

  try {
    if (automationRuleToUpsert.id) {
      const data = await prisma.automationRule.update({
        where: {
          id: automationRuleToUpsert.id
        },
        data: automationRuleToUpsert,
        include: {
          category: true
        }
      })
      return res.json({ data })
    } else {
      const data = await prisma.automationRule.create({
        data: automationRuleToUpsert,
        include: {
          category: true
        }
      })
      return res.json({ data })
    }
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Couldn't update automation rule`)
  }
}
