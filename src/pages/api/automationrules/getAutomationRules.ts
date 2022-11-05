// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AutomationRuleWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

export type ResponseData = {
  error?: string;
  data?: AutomationRuleWithCategory[];
};

export default async function getAutomationRules(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' });
  }
  try {
    const data = await prisma.automationRule.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    });
    res.json({ data });
  } catch (err) {
    console.error(`ERROR | getAutomationRules: `, err);
    res.status(500).json({ error: 'Internal error | Could not get automation rules' });
  }
}
