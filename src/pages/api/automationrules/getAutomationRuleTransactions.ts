// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TransactionWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

type ResponseData = {
  error?: any;
  data?: TransactionWithCategory[];
};

export default async function getAutomationRuleTransactions(
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
          }
        });

        if (!data) return res.status(400).json({ error: 'no automation rule with this id exists' });
        const automationRuleValue = data.value;

        const matchingTransactions = await prisma.transaction.findMany({
          where: {
            OR: [
              {
                issuer: {
                  contains: automationRuleValue
                }
              },
              {
                purpose: {
                  contains: automationRuleValue
                }
              }
            ]
          },
          include: {
            category: true
          }
        });

        return res.json({ data: matchingTransactions });
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
