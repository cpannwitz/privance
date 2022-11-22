// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiHandler } from 'next'
import { TransactionWithCategory } from '../../../types/types'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) =>
  apiExceptionHandler(req, res)(getAutomationRuleTransactions)
export default handler

async function getAutomationRuleTransactions(
  req: NextApiRequest,
  res: NextApiResponseData<TransactionWithCategory[]>
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
      }
    })

    if (!data) {
      throw new API_EXCEPTION.BadRequestException()
    }
    const automationRuleValue = data.value

    const matchingTransactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            issuer: {
              contains: automationRuleValue,
              mode: 'insensitive'
            }
          },
          {
            purpose: {
              contains: automationRuleValue,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        category: true
      }
    })

    return res.json({ data: matchingTransactions })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Couldn't get automation rule transactions`)
  }
}
