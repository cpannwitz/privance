/*
  Warnings:

  - You are about to drop the column `currency` on the `Transaction` table. All the data in the column will be lost.

*/
-- RedefineTables
-- PRAGMA foreign_keys=OFF;
-- CREATE TABLE "new_Transaction" (
--     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
--     "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "identifier" REAL,
--     "issuedate" DATETIME,
--     "issuer" TEXT,
--     "type" TEXT,
--     "purpose" TEXT,
--     "balance" REAL,
--     "balanceCurrency" TEXT,
--     "amount" REAL,
--     "amountCurrency" TEXT
-- );
-- INSERT INTO "new_Transaction" ("amount", "balance", "createdAt", "id", "identifier", "issuedate", "issuer", "purpose", "type", "updatedAt") SELECT "amount", "balance", "createdAt", "id", "identifier", "issuedate", "issuer", "purpose", "type", "updatedAt" FROM "Transaction";
-- DROP TABLE "Transaction";
-- ALTER TABLE "new_Transaction" RENAME TO "Transaction";
-- CREATE UNIQUE INDEX "Transaction_identifier_key" ON "Transaction"("identifier");
-- PRAGMA foreign_key_check;
-- PRAGMA foreign_keys=ON;

ALTER TABLE "Transaction"
RENAME COLUMN "currency" TO "amountCurrency";
ALTER TABLE "Transaction" ADD COLUMN "balancyCurrency" TEXT;