// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { MonthlyTransactionsWithCategories, TransactionWithCategories } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: MonthlyTransactionsWithCategories
}

export default async function getMonthlyTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      // TODO: checkout Prisma groupBy/aggregate features to build this moloch easier?
      // https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing
      const data = await prisma.transaction.findMany({
        orderBy: [{ issuedate: "desc" }],
        include: { categories: true, _count: true },
      })
      const firstTransaction = { ...data[data.length - 1] }
      const lastTransaction = { ...data[0] }

      const sortedData = sortTransactions(data, "desc")

      const startDate = firstTransaction.issuedate || new Date()
      const endDate = lastTransaction.issuedate || new Date()
      const currency = lastTransaction.balanceCurrency || ""
      const preBalance = (firstTransaction.balance || 0) - (firstTransaction.amount || 0)

      // split data into months
      let monthlyData: MonthlyTransactionsWithCategories = sortedData.reduce(
        (transformedData: any, transaction) => {
          // TODO: better typing of reducer
          if (!transaction.issuedate) return
          const month = new Date(transaction.issuedate).getMonth()
          const year = new Date(transaction.issuedate).getFullYear()
          if (!transformedData.years[year]) transformedData.years[year] = {}
          if (!transformedData.years[year].months) transformedData.years[year].months = {}
          if (!transformedData.years[year].months[month])
            transformedData.years[year].months[month] = {}
          if (!Array.isArray(transformedData.years[year].months[month].transactions))
            transformedData.years[year].months[month].transactions = []

          transformedData.years[year].months[month].transactions.push(transaction)

          return transformedData
        },
        { years: {} }
      )

      // aggregate total minus/plus balance + meta display info
      let totalPlus = 0
      let totalMinus = 0
      Object.keys(monthlyData.years).forEach(year => {
        let totalYearPlus = 0
        let totalYearMinus = 0
        Object.keys(monthlyData.years[year].months).forEach(month => {
          monthlyData.years[year].months[month].month = Number(month)
          const totalMonthPlus = monthlyData.years[year].months[month].transactions
            .filter(t => t && t.amount && t.amount > 0)
            .reduce((sum, t) => sum + (t.amount || 0), 0)
          const totalMonthMinus = monthlyData.years[year].months[month].transactions
            .filter(t => t && t.amount && t.amount <= 0)
            .reduce((sum, t) => sum + (t.amount || 0), 0)
          totalPlus += totalMonthPlus
          totalMinus += totalMonthMinus
          totalYearPlus += totalMonthPlus
          totalYearMinus += totalMonthMinus
          monthlyData.years[year].months[month].totalMonthPlus = totalMonthPlus
          monthlyData.years[year].months[month].totalMonthMinus = totalMonthMinus
          monthlyData.years[year].months[month].totalMonthPlusPercentage =
            (Math.abs(totalMonthPlus) / (Math.abs(totalMonthPlus) + Math.abs(totalMonthMinus))) *
            100
          monthlyData.years[year].months[month].totalMonthMinusPercentage =
            (Math.abs(totalMonthMinus) / (Math.abs(totalMonthPlus) + Math.abs(totalMonthMinus))) *
            100
        })
        monthlyData.years[year].totalYearPlus = totalYearPlus
        monthlyData.years[year].totalYearMinus = totalYearMinus
        monthlyData.years[year].year = Number(year)
      })
      monthlyData.totalPlus = totalPlus
      monthlyData.totalMinus = totalMinus
      monthlyData.startDate = startDate
      monthlyData.endDate = endDate
      monthlyData.currency = currency
      monthlyData.preBalance = preBalance
      monthlyData.totalPlusPercentage =
        (Math.abs(totalPlus) / (Math.abs(totalPlus) + Math.abs(totalMinus))) * 100
      monthlyData.totalMinusPercentage =
        (Math.abs(totalMinus) / (Math.abs(totalPlus) + Math.abs(totalMinus))) * 100

      res.json({ data: monthlyData })
    } catch (err) {
      console.error(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
// TODO: replace with saved order to DB
function sortTransactions(
  transactions: TransactionWithCategories[],
  sortDirection: "asc" | "desc" = "desc"
) {
  const isDesc = sortDirection === "desc"
  const sorted = [...transactions].sort((a, b) => {
    if (!a.issuedate || !b.issuedate) return 0

    const aDate = new Date(a.issuedate).getTime()
    const bDate = new Date(b.issuedate).getTime()

    if (aDate < bDate) return isDesc ? 1 : -1

    if (aDate > bDate) return isDesc ? -1 : 1

    if (aDate === bDate) {
      if (a.balance === null || a.amount === null || b.balance === null || b.amount === null) {
        return 0
      }
      return isDesc ? 1 : -1
    }
    return 0
  })
  return sorted
}
