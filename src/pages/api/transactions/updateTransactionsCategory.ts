// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { TransactionWithCategory } from '../../../types/types'
import { prisma } from '../../../shared/database'

type ResponseData = {
  error?: string
  data?: TransactionWithCategory[]
}

export default async function updateTransactionsCategory(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'wrong http method' })
  }

  const transactionsToUpdate = req.body as (Prisma.TransactionWhereUniqueInput & {
    categoryConnect?: number
  })[]

  if (!transactionsToUpdate || !Array.isArray(transactionsToUpdate)) {
    return res.status(400).json({ error: 'missing argument' })
  }

  try {
    const insertedData = await prisma.$transaction(
      transactionsToUpdate.map(data =>
        prisma.transaction.update({
          where: {
            id: data.id
          },
          data: {
            category: {
              connect: data.categoryConnect ? { id: data.categoryConnect } : undefined
            }
          },
          include: {
            category: true
          }
        })
      )
    )

    res.json({ data: insertedData })
  } catch (err) {
    console.error(`ERROR | updateTransactionsCategory: `, err)
    res.status(500).json({ error: 'Internal error | Could not update transactions categories' })
  }
}

// TODO: example for client side api abstraction, implement for all client side axios usages

// export async function updateTransactionsCategory(
//   data: typeof apiDir.transactions.updateTransactionsCategory.type // ! WRONG -> needs input type
// ) {
//   const api = apiDir.transactions.updateTransactionsCategory

//   return axios<ApiResponseData<typeof api.type>>({
//     method: api.method,
//     url: api.url,
//     data: data
//   }).catch((error: AxiosError<ApiResponseData<typeof api.type>>) => {
//     if (error.response) {
//       // enqueueSnackbar(`Couldn't update your transactions: ${error.response.data.error?.message}`, {
//       //   variant: 'error'
//       // })
//     }
//   })
// }
