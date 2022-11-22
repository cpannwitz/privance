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

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(getAutomationRuleById)
export default handler

async function getAutomationRuleById(
  req: NextApiRequest,
  res: NextApiResponseData<AutomationRuleWithCategory | null>
) {
  if (req.method !== API_METHOD.GET) {
    throw new API_EXCEPTION.WrongMethodException()
  }
  const { id } = req.query

  if (!id || !Number(id)) {
    throw new API_EXCEPTION.BadRequestException()
  }

  try {
    const data = await prisma.automationRule.findFirst({
      where: {
        id: Number(id)
      },
      include: { category: true }
    })
    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Couldn't get automation rule`)
  }
}
