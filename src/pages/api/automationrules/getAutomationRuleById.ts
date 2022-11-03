// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AutomationRuleWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

type ResponseData = {
  error?: any;
  data?: AutomationRuleWithCategory | null;
};

export default async function getAutomationRuleById(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    const { rule } = req.query;
    const automationRuleId = Number(rule) || null;

    if (automationRuleId) {
      try {
        const data = await prisma.automationRule.findFirst({
          where: {
            id: automationRuleId
          },
          include: { category: true }
        });
        res.json({ data });
      } catch (err) {
        console.error(`ERROR | err`, err);
        res.status(500).json({ error: err });
      }
    } else {
      res.status(400).json({ error: 'missing id argument' });
    }
  } else {
    res.status(405).json({ error: 'wrong http method' });
  }
}
