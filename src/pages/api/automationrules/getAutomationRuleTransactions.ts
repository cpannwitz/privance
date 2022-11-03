// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TransactionWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

type ResponseData = {
  error?: string;
  data?: TransactionWithCategory[];
};

export default async function getAutomationRuleTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' });
  }
  const { rule } = req.query;
  if (!rule || !Number(rule)) {
    return res.status(400).json({ error: 'missing argument' });
  }

  const automationRuleId = Number(rule);

  try {
    const data = await prisma.automationRule.findFirst({
      where: {
        id: automationRuleId
      }
    });

    if (!data) {
      return res.status(400).json({ error: 'no automation rule with this id exists' });
    }
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
    console.error(`ERROR | getAutomationRuleTransactions: `, err);
    res.status(500).json({ error: 'Internal error | Could not get automation rule transactions' });
  }
}
