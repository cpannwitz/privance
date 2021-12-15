// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { AutomationRuleWithCategories } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: AutomationRuleWithCategories[]
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
        include: { categories: true },
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
