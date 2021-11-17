import type { Prisma } from ".prisma/client"

// expects "19.03.2020"
// returns "2020-03-19T00:00:00+00:00"
function transformDate(value: string) {
  return value.split(".").reverse().join("-") + "T00:00:00+00:00"
}
// expects "-19,23"
// returns -19.23
function transformNumber(value: string) {
  return value.replaceAll(".", "").replaceAll(",", ".")
}

const transformAccountChanges = async (accountChanges: string[][]) => {
  const values: Prisma.AccountChangeCreateInput[] = accountChanges.map(change => ({
    issuedate: new Date(transformDate(change[0])),
    issuer: change[2],
    type: change[3],
    purpose: change[4],
    balance: Number(transformNumber(change[5])),
    amount: Number(transformNumber(change[7])),
    currency: change[8],
  }))
  return values
}

export default transformAccountChanges
