// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Transaction } from '.prisma/client';
import { prisma } from '../../../shared/database';

export type ResponseData = {
  error?: string;
  data?: Transaction[];
};

export default async function deleteTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'wrong http method' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'missing argument' });
  }

  if (!Array.isArray(id)) {
    const ids_array = id.split(',');
    try {
      const deletedData = await prisma.$transaction(
        ids_array.map(id =>
          prisma.transaction.delete({
            where: {
              id: Number(id)
            }
          })
        )
      );
      res.json({ data: deletedData });
    } catch (err) {
      console.error(`ERROR | deleteTransactions: `, err);
      res.status(500).json({ error: 'Internal error | Could not delete transactions' });
    }
  }
}
