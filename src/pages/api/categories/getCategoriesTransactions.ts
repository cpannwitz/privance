// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CategoryWithTransactions } from '../../../types/types';
import { prisma } from '../../../shared/database';

type ResponseData = {
  error?: string;
  data?: CategoryWithTransactions[];
};

export default async function getCategoriesTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' });
  }

  try {
    const data = await prisma.category.findMany({
      include: {
        transactions: true,
        _count: true
      }
    });

    res.json({
      data
    });
  } catch (err) {
    console.error(`ERROR | getCategoriesTransactions: `, err);
    res.status(500).json({ error: 'Internal error | Could not get categories transactions' });
  }
}
