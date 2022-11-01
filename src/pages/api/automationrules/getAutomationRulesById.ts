// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../shared/database"
import { AutomationRuleWithCategory } from "../../../types/types"

type ResponseData = {
  error?: any
  data?: AutomationRuleWithCategory[]
}

export default async function getAutomationRulesById(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
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
