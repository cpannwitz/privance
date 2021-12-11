// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Prisma } from ".prisma/client"
import { AutomationRuleWithCategories } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: AutomationRuleWithCategories
}

export default async function addAutomationRule(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const bodydata = req.body as Prisma.AutomationRuleCreateInput

    // TODO: better validation needed (runtypes?)
    if (!bodydata.field || !bodydata.operation || !bodydata.categories) {
      return res.status(400).json({ error: "Missing name argument" })
    }

    try {
      const insertedData = await prisma.automationRule.create({
        data: bodydata,
        include: {
          categories: true,
        },
      })

      return res.json({ data: insertedData })
    } catch (err) {
      console.error(`ERROR | err`, err)
      return res.status(500).json({ error: err })
    }
  } else {
    return res.status(405).json({ error: "wrong http method" })
  }
}
