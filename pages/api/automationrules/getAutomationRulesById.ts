// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { AutomationRuleWithCategory } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: AutomationRuleWithCategory[]
}

export default async function getAutomationRulesById(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    // TODO: wtf, better query extracting -> querystring
    // ! https://www.npmjs.com/package/query-string
    const rules = req.query["rules[]"]

    const automationRuleIds: number[] = []
    if (rules && typeof rules === "string") {
      automationRuleIds.push(Number(rules))
    } else if (rules && Array.isArray(rules)) {
      automationRuleIds.push(...rules.map(rule => Number(rule)))
    }

    try {
      const data = await prisma.automationRule.findMany({
        where: {
          id: {
            in: automationRuleIds,
          },
        },
        include: { category: true },
      })
      res.json({ data })
    } catch (err) {
      console.error(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
