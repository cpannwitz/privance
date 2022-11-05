// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CategoryWithAutomationRules } from '../../../types/types';
import { prisma } from '../../../shared/database';

export type ResponseData = {
  error?: string;
  data?: CategoryWithAutomationRules[];
};

export default async function getAutomationRulesByCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' });
  }
  try {
    const data = await prisma.category.findMany({
      where: {
        automationRules: { some: {} }
      },
      include: {
        automationRules: {
          include: {
            category: true
          }
        }
      }
    });

    res.json({ data });
  } catch (err) {
    console.error(`ERROR | getAutomationRulesByCategory: `, err);
    res.status(500).json({ error: 'Internal error | Could not get automation rules by category' });
  }
}
