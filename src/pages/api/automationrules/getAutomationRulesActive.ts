// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AutomationRuleWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

export type ResponseData = {
  error?: string;
  data?: AutomationRuleWithCategory[];
};

export default async function getAutomationRulesActive(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' });
  }
  try {
    const data = await prisma.automationRule.findMany({
      where: {
        activeOnUpload: true
      },
      include: { category: true }
    });
    res.json({ data });
  } catch (err) {
    console.error(`ERROR | getAutomationRulesActive: `, err);
    res.status(500).json({ error: 'Internal error | Could not get active automation rules' });
  }
}
