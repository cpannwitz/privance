/*
  Warnings:

  - You are about to drop the `AccountChange` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountChangeCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AccountChange";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AccountChangeCategories";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "issuedate" DATETIME,
    "issuer" TEXT,
    "type" TEXT,
    "purpose" TEXT,
    "balance" REAL,
    "amount" REAL,
    "currency" TEXT
);

-- CreateTable
CREATE TABLE "_TransactionCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Transaction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_TransactionCategories_AB_unique" ON "_TransactionCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_TransactionCategories_B_index" ON "_TransactionCategories"("B");
