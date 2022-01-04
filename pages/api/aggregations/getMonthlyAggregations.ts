// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import {
  CategoryWithTransactions,
  MonthlyAggregations,
  TransactionWithCategory,
} from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: MonthlyAggregations
}

export default async function getMonthlyAggregations(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.transaction.findMany({
        orderBy: [{ issuedate: "desc" }],
        include: {
          category: true,
          _count: true,
        },
      })
      const sortedData = sortTransactions(data, "desc")

      // TODO: replace with user setting currency
      const lastTransaction = { ...data[0] }
      const currency = lastTransaction.balanceCurrency || ""

      // split data into months
      const monthlyData: MonthlyAggregations = sortedData.reduce(
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
      Object.keys(monthlyData.years).forEach(year => {
        let totalYearPlus = 0
        let totalYearMinus = 0
        Object.keys(monthlyData.years[year].months).forEach(month => {
          const totalMonthPlus = monthlyData.years[year].months[month].transactions
            .filter(t => t && t.amount && t.amount > 0)
            .reduce((sum, t) => sum + (t.amount || 0), 0)
          const totalMonthMinus = monthlyData.years[year].months[month].transactions
            .filter(t => t && t.amount && t.amount <= 0)
            .reduce((sum, t) => sum + (t.amount || 0), 0)
          totalYearPlus += totalMonthPlus
          totalYearMinus += totalMonthMinus
          monthlyData.years[year].months[month].month = Number(month)
          monthlyData.years[year].months[month].totalMonthPlus = totalMonthPlus
          monthlyData.years[year].months[month].totalMonthMinus = totalMonthMinus
          monthlyData.years[year].months[month].totalMonthPlusPercentage =
            (Math.abs(totalMonthPlus) / (Math.abs(totalMonthPlus) + Math.abs(totalMonthMinus))) *
            100
          monthlyData.years[year].months[month].totalMonthMinusPercentage =
            (Math.abs(totalMonthMinus) / (Math.abs(totalMonthPlus) + Math.abs(totalMonthMinus))) *
            100

          const monthlyCategories = monthlyData.years[year].months[month].transactions.reduce(
            (monthlyCategories, transaction) => {
              if (!transaction.category) return monthlyCategories
              if (!monthlyCategories[transaction.category.name]) {
                monthlyCategories[transaction.category.name] = {
                  ...transaction.category,
                  transactions: [],
                  _count: { transactions: 0, automationRules: 0 },
                  transactionBalance: 0,
                }
              }
              monthlyCategories[transaction.category.name].transactions.push(transaction)
              monthlyCategories[transaction.category.name]._count.transactions += 1
              monthlyCategories[transaction.category.name].transactionBalance +=
                transaction.amount || 0
              return monthlyCategories
            },
            {} as {
              [key: string]: CategoryWithTransactions & {
                transactionBalance: number
              }
            }
          )
          monthlyData.years[year].months[month].categories = Object.values(monthlyCategories).map(
            c => ({ ...c, transactionBalance: Math.abs(c.transactionBalance) })
          )
        })
        monthlyData.years[year].totalYearPlus = totalYearPlus
        monthlyData.years[year].totalYearMinus = totalYearMinus
        monthlyData.years[year].year = Number(year)
      })
      monthlyData.currency = currency

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
  transactions: TransactionWithCategory[],
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
