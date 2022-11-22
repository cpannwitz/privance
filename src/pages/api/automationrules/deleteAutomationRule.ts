// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiHandler } from 'next'
import { AutomationRule } from '@prisma/client'
import { prisma } from '../../../shared/database'

import {
  type NextApiResponseData,
  API_METHOD,
  API_EXCEPTION,
  apiExceptionHandler
} from '../../../shared/apiUtils'

const handler: NextApiHandler = (req, res) => apiExceptionHandler(req, res)(deleteAutomationRule)
export default handler

async function deleteAutomationRule(req: NextApiRequest, res: NextApiResponseData<AutomationRule>) {
  if (req.method !== API_METHOD.DELETE) {
    throw new API_EXCEPTION.WrongMethodException()
  }
  const { id } = req.query

  if (!id) {
    throw new API_EXCEPTION.BadRequestException()
  }

  try {
    const data = await prisma.automationRule.delete({
      where: {
        id: Number(id)
      }
    })
    res.json({ data })
  } catch (err) {
    throw new API_EXCEPTION.InternalException(`Could not delete automation rule`)
  }
}
