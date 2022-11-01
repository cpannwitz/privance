// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../shared/database';
import { TransactionWithCategory } from '../../../types/types';
import sortTransactions from '../../../shared/sortTransactions';

type ResponseData = {
  error?: any;
  data?: TransactionWithCategory[];
};

export default async function getTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.transaction.findMany({
        include: { category: true }
      });
      const sortedData = sortTransactions(data, 'desc');
      res.json({ data: sortedData });
    } catch (err) {
      console.error(`ERROR | err`, err);
      res.status(500).json({ error: err });
    }
  } else {
    res.status(405).json({ error: 'wrong http method' });
  }
}
