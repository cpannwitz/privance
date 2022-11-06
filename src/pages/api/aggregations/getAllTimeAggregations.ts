// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { AllTimeAggregations } from '../../../types/types'
import { prisma } from '../../../shared/database'
import sortTransactions from '../../../shared/sortTransactions'

export type ResponseData = {
  error?: string
  data?: AllTimeAggregations | null
}

export default async function getAllTimeAggregations(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'wrong http method' })
  }

  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: [{ issuedate: 'desc' }],
      include: {
        category: true
      }
    })

    if (transactions.length <= 0) {
      return res.status(200).json({ data: null })
    }

    const categoriesRaw = await prisma.category.findMany({
      include: {
        transactions: true,
        _count: true
      }
    })

    // TODO: extract to own function

    const firstTransaction = { ...transactions[transactions.length - 1] }
    const lastTransaction = { ...transactions[0] }

    const sortedData = sortTransactions(transactions, 'desc')

    const totalPlus = sortedData
      .filter(t => t && t.amount && t.amount > 0)
      .reduce((sum, t) => sum + (t.amount || 0), 0)

    const totalMinus = sortedData
      .filter(t => t && t.amount && t.amount <= 0)
      .reduce((sum, t) => sum + (t.amount || 0), 0)

    const startDate = firstTransaction.issuedate || new Date()
    const endDate = lastTransaction.issuedate || new Date()
    const currency = lastTransaction.balanceCurrency || ''
    const preBalance = (firstTransaction.balance || 0) - (firstTransaction.amount || 0)

    const totalPlusPercentage =
      (Math.abs(totalPlus) / (Math.abs(totalPlus) + Math.abs(totalMinus))) * 100 || 0
    const totalMinusPercentage =
      (Math.abs(totalMinus) / (Math.abs(totalPlus) + Math.abs(totalMinus))) * 100 || 0

    const categories = categoriesRaw.map(c => ({
      ...c,
      transactionBalance: Math.abs(c.transactions.reduce((sum, t) => (sum += t.amount || 0), 0))
    }))

    const data = {
      totalPlus,
      totalMinus,
      startDate,
      endDate,
      currency,
      preBalance,
      totalPlusPercentage,
      totalMinusPercentage,
      transactions,
      categories
    }

    res.json({ data })
  } catch (err) {
    console.error(`ERROR | getAllTimeAggregations: `, err)
    res.status(500).json({ error: 'Internal error | Could not get alltime aggregations' })
  }
}
