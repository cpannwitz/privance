// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../shared/database';
import {
  CategoryWithTransactions,
  MonthlyAggregations
} from '../../../types/types';
import sortTransactions from '../../../shared/sortTransactions';
import categoryUncategorized from '../../../shared/categoryUncategorized';

type ResponseData = {
  error?: any;
  data?: MonthlyAggregations | undefined;
};

export default async function getMonthlyAggregations(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: [{ issuedate: 'desc' }],
        include: {
          category: true
        }
      });

      if (transactions.length <= 0) {
        return res.status(200).json({ data: undefined });
      }

      const sortedData = sortTransactions(transactions, 'desc');

      // TODO: replace with user setting currency
      const lastTransaction = { ...transactions[0] };
      const currency = lastTransaction.balanceCurrency || '';

      // split data into months
      const monthlyData: MonthlyAggregations = sortedData.reduce(
        (transformedData: any, transaction) => {
          // TODO: better typing of reducer
          if (!transaction.issuedate) return;
          const month = new Date(transaction.issuedate).getMonth();
          const year = new Date(transaction.issuedate).getFullYear();
          if (!transformedData.years[year]) transformedData.years[year] = {};
          if (!transformedData.years[year].months)
            transformedData.years[year].months = {};
          if (!transformedData.years[year].months[month])
            transformedData.years[year].months[month] = {};
          if (
            !Array.isArray(
              transformedData.years[year].months[month].transactions
            )
          )
            transformedData.years[year].months[month].transactions = [];

          transformedData.years[year].months[month].transactions.push(
            transaction
          );

          return transformedData;
        },
        { years: {} }
      );

      // aggregate total minus/plus balance + meta display info
      Object.keys(monthlyData.years).forEach(year => {
        let totalYearPlus = 0;
        let totalYearMinus = 0;
        Object.keys(monthlyData.years[year].months).forEach(month => {
          const totalMonthPlus = monthlyData.years[year].months[
            month
          ].transactions
            .filter(t => t && t.amount && t.amount > 0)
            .reduce((sum, t) => sum + (t.amount || 0), 0);
          const totalMonthMinus = monthlyData.years[year].months[
            month
          ].transactions
            .filter(t => t && t.amount && t.amount <= 0)
            .reduce((sum, t) => sum + (t.amount || 0), 0);
          totalYearPlus += totalMonthPlus;
          totalYearMinus += totalMonthMinus;
          monthlyData.years[year].months[month].month = Number(month);
          monthlyData.years[year].months[month].totalMonthPlus = totalMonthPlus;
          monthlyData.years[year].months[month].totalMonthMinus =
            totalMonthMinus;
          monthlyData.years[year].months[month].totalMonthPlusPercentage =
            (Math.abs(totalMonthPlus) /
              (Math.abs(totalMonthPlus) + Math.abs(totalMonthMinus))) *
            100;
          monthlyData.years[year].months[month].totalMonthMinusPercentage =
            (Math.abs(totalMonthMinus) /
              (Math.abs(totalMonthPlus) + Math.abs(totalMonthMinus))) *
            100;

          const monthlyCategories = monthlyData.years[year].months[
            month
          ].transactions.reduce(
            (monthlyCategories, transaction) => {
              if (!transaction.category) {
                if (!monthlyCategories[categoryUncategorized.name]) {
                  monthlyCategories[categoryUncategorized.name] = {
                    ...categoryUncategorized,
                    transactions: [],
                    _count: { transactions: 0, automationRules: 0 },
                    transactionBalance: 0
                  };
                }
                monthlyCategories[categoryUncategorized.name].transactions.push(
                  transaction
                );
                monthlyCategories[
                  categoryUncategorized.name
                ]._count.transactions += 1;
                monthlyCategories[
                  categoryUncategorized.name
                ].transactionBalance += transaction.amount || 0;
                return monthlyCategories;
              }
              if (!monthlyCategories[transaction.category.name]) {
                monthlyCategories[transaction.category.name] = {
                  ...transaction.category,
                  transactions: [],
                  _count: { transactions: 0, automationRules: 0 },
                  transactionBalance: 0
                };
              }
              monthlyCategories[transaction.category.name].transactions.push(
                transaction
              );
              monthlyCategories[
                transaction.category.name
              ]._count.transactions += 1;
              monthlyCategories[transaction.category.name].transactionBalance +=
                transaction.amount || 0;
              return monthlyCategories;
            },
            {} as {
              [key: string]: CategoryWithTransactions & {
                transactionBalance: number;
              };
            }
          );
          monthlyData.years[year].months[month].categories = Object.values(
            monthlyCategories
          ).map(c => ({
            ...c,
            transactionBalance: Math.abs(c.transactionBalance)
          }));
        });
        monthlyData.years[year].totalYearPlus = totalYearPlus;
        monthlyData.years[year].totalYearMinus = totalYearMinus;
        monthlyData.years[year].year = Number(year);
      });
      monthlyData.currency = currency;

      res.json({ data: monthlyData });
    } catch (err) {
      console.error(`ERROR | err`, err);
      res.status(500).json({ error: err });
    }
  } else {
    res.status(405).json({ error: 'wrong http method' });
  }
}
