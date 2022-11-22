// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiHandler } from 'next'
import { AutomationRuleWithCategory } from '../../../types/types'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) =>
  apiExceptionHandler(req, res)(getAutomationRulesActive)
export default handler

async function getAutomationRulesActive(
  req: NextApiRequest,
  res: NextApiResponseData<AutomationRuleWithCategory[]>
) {
  if (req.method !== API_METHOD.GET) {
    throw new API_EXCEPTION.WrongMethodException()
  }
  try {
    const data = await prisma.automationRule.findMany({
      where: {
        activeOnUpload: true
      },
      include: { category: true }
    })
    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Couldn't get automation rules`)
  }
}
