// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../shared/database';
import type { CategoryWithTransactions } from '../../../types/types';

type ResponseData = {
  error?: string;
  data?: CategoryWithTransactions | null;
};

export default async function getCategoryTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' });
  }
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'missing argument' });
  }
  try {
    const data = await prisma.category.findFirst({
      where: {
        id: Number(id)
      },
      include: {
        transactions: true,
        _count: true
      }
    });

    res.json({ data });
  } catch (err) {
    console.error(`ERROR | getCategoryTransactions: `, err);
    res.status(500).json({ error: 'Internal error | Could not get category transactions' });
  }
}
