// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Prisma } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TransactionWithCategory } from '../../../types/types';
import { prisma } from '../../../shared/database';

export type ResponseData = {
  error?: string;
  data?: TransactionWithCategory;
};

export default async function updateTransactionCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'wrong http method' });
  }

  const transactionToUpdate = req.body as Prisma.TransactionWhereUniqueInput & {
    category?: number;
  };

  if (!transactionToUpdate.id) {
    return res.status(400).json({ error: 'missing argument' });
  }
  try {
    const data = await prisma.transaction.update({
      where: {
        id: transactionToUpdate.id
      },
      data: {
        category: {
          connect: transactionToUpdate.category ? { id: transactionToUpdate.category } : undefined,
          disconnect: !transactionToUpdate.category ? true : undefined
        }
      },
      include: {
        category: true
      }
    });

    res.json({ data });
  } catch (err) {
    console.error(`ERROR | updateTransactionCategory: `, err);
    res.status(500).json({ error: 'Internal error | Could not update transaction category' });
  }
}
