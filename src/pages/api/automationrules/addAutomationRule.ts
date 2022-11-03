// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Prisma } from '.prisma/client';
import type { AutomationRuleWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

type ResponseData = {
  error?: any;
  data?: AutomationRuleWithCategory;
};

export default async function addAutomationRule(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const bodydata = req.body as Prisma.AutomationRuleCreateInput;

    if (!bodydata.value || !bodydata.category) {
      return res
        .status(400)
        .json({ error: 'Missing value or category argument' });
    }

    try {
      const insertedData = await prisma.automationRule.create({
        data: bodydata,
        include: {
          category: true
        }
      });

      return res.json({ data: insertedData });
    } catch (err) {
      console.error(`ERROR | err`, err);
      return res.status(500).json({ error: err });
    }
  } else {
    return res.status(405).json({ error: 'wrong http method' });
  }
}
