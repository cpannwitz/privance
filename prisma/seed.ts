import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  // * Category
  const category_salary = await prisma.category.create({
    data: {
      color: '#8bc34a',
      icon: 'star',
      name: 'Salary'
    }
  })
  const category_car = await prisma.category.create({
    data: {
      color: '#9c27b0',
      icon: 'car',
      name: 'Car'
    }
  })
  const category_bills = await prisma.category.create({
    data: {
      color: '#2196f3',
      icon: 'settings',
      name: 'Bills'
    }
  })

  // * AutomationRule
  await prisma.automationRule.create({
    data: {
      category: {
        connect: {
          id: category_salary.id
        }
      },
      value: 'salary'
    }
  })
  await prisma.automationRule.create({
    data: {
      category: {
        connect: {
          id: category_car.id
        }
      },
      value: 'leasing'
    }
  })
  await prisma.automationRule.create({
    data: {
      category: {
        connect: {
          id: category_bills.id
        }
      },
      value: 'smartphone'
    }
  })

  // * Transaction
  await prisma.transaction.createMany({
    data: [
      {
        issuedate: '2022-10-05T00:00:00.000Z',
        issuer: 'Example Issuer',
        type: 'Lastschrift',
        purpose: 'Example Purpose smartphone',
        balance: 589.59,
        balanceCurrency: 'EUR',
        amount: -40,
        amountCurrency: 'EUR',
        identifier: 12345.56,
        categoryId: category_bills.id
      },
      {
        issuedate: '2022-10-04T00:00:00.000Z',
        issuer: 'Example Issuer',
        type: 'Lastschrift',
        purpose: 'Example Purpose salary',
        balance: 629.59,
        balanceCurrency: 'EUR',
        amount: 225.0,
        amountCurrency: 'EUR',
        identifier: 12345.45,
        categoryId: category_salary.id
      },
      {
        issuedate: '2022-10-03T00:00:00.000Z',
        issuer: 'Example Issuer',
        type: 'Lastschrift',
        purpose: 'Example Purpose leasing',
        balance: 485.04,
        balanceCurrency: 'EUR',
        amount: -80.45,
        amountCurrency: 'EUR',
        identifier: 12345.34,
        categoryId: category_car.id
      },
      {
        issuedate: '2022-10-02T00:00:00.000Z',
        issuer: 'Example Issuer',
        type: 'Lastschrift',
        purpose: 'Example Purpose',
        balance: 495.38,
        balanceCurrency: 'EUR',
        amount: -10.34,
        amountCurrency: 'EUR',
        identifier: 12345.23
      },
      {
        issuedate: '2022-10-01T00:00:00.000Z',
        issuer: 'Example Issuer',
        type: 'Lastschrift',
        purpose: 'Example Purpose',
        balance: 500,
        balanceCurrency: 'EUR',
        amount: -4.62,
        amountCurrency: 'EUR',
        identifier: 12345.12
      }
    ],
    skipDuplicates: true
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
