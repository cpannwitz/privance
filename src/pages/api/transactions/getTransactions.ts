// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TransactionWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';
import sortTransactions from '../../../shared/sortTransactions';

type ResponseData = {
  error?: string;
  data?: TransactionWithCategory[];
};

export default async function getTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' });
  }

  try {
    const data = await prisma.transaction.findMany({
      include: { category: true }
    });
    const sortedData = sortTransactions(data, 'desc');
    res.json({ data: sortedData });
  } catch (err) {
    console.error(`ERROR | getTransactions: `, err);
    res.status(500).json({ error: 'Internal error | Could not get transactions' });
  }
}
