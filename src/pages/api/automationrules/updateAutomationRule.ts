// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Prisma } from '.prisma/client';
import type { AutomationRuleWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

type ResponseData = {
  error?: any;
  data?: AutomationRuleWithCategory;
};

export default async function updateAutomationRule(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const bodydata = req.body as Prisma.AutomationRuleUpdateInput &
      Prisma.AutomationRuleWhereUniqueInput;

    if (!bodydata.id || !bodydata.category) {
      return res.status(400).json({ error: 'Missing id or category argument' });
    }

    const { id, ...data } = bodydata;

    try {
      const insertedData = await prisma.automationRule.update({
        where: {
          id: id
        },
        data: data,
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
