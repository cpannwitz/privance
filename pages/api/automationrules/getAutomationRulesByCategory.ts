// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../shared/database"
import { CategoryWithAutomationRules } from "../../../types/types"

type ResponseData = {
  error?: any
  data?: CategoryWithAutomationRules[]
}

export default async function getAutomationRulesByCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.category.findMany({
        where: {
          automationRules: { some: {} },
        },
        include: {
          automationRules: {
            include: {
              category: true,
            },
          },
        },
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
