// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../shared/database"
import { AutomationRuleWithCategory } from "../../../types/types"

type ResponseData = {
  error?: any
  data?: AutomationRuleWithCategory[]
}

export default async function getAutomationRulesActive(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.automationRule.findMany({
        where: {
          activeOnUpload: true,
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
