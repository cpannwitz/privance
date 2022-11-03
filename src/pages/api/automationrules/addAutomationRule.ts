// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Prisma } from '.prisma/client';
import type { AutomationRuleWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

type ResponseData = {
  error?: string;
  data?: AutomationRuleWithCategory;
};

export default async function addAutomationRule(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'wrong http method' });
  }

  const bodydata = req.body as Prisma.AutomationRuleCreateInput;

  if (!bodydata.value || !bodydata.category) {
    return res.status(400).json({ error: 'missing argument' });
  }

  try {
    const data = await prisma.automationRule.create({
      data: bodydata,
      include: {
        category: true
      }
    });

    return res.json({ data });
  } catch (err) {
    console.error(`ERROR | addAutomationRule: `, err);
    res.status(500).json({ error: 'Internal error | Could not add automation rule' });
  }
}
