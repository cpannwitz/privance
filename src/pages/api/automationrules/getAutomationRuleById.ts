// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AutomationRuleWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

type ResponseData = {
  error?: string;
  data?: AutomationRuleWithCategory | null;
};

export default async function getAutomationRuleById(
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
      },
      include: { category: true }
    });
    res.json({ data });
  } catch (err) {
    console.error(`ERROR | getAutomationRuleById: `, err);
    res.status(500).json({ error: 'Internal error | Could not get automation rule by id' });
  }
}
