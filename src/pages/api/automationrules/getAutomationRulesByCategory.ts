// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiHandler } from 'next'
import { CategoryWithAutomationRules } from '../../../types/types'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) =>
  apiExceptionHandler(req, res)(getAutomationRulesByCategory)
export default handler

async function getAutomationRulesByCategory(
  req: NextApiRequest,
  res: NextApiResponseData<CategoryWithAutomationRules[]>
) {
  if (req.method !== API_METHOD.GET) {
    throw new API_EXCEPTION.WrongMethodException()
  }
  try {
    const data = await prisma.category.findMany({
      where: {
        automationRules: { some: {} }
      },
      include: {
        automationRules: {
          include: {
            category: true
          }
        }
      }
    })

    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Couldn't get automation rules`)
  }
}
