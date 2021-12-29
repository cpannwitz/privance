/*
  Warnings:

  - You are about to drop the `_AutomationRuleCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TransactionCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `AutomationRule` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AutomationRuleCategories_B_index";

-- DropIndex
DROP INDEX "_AutomationRuleCategories_AB_unique";

-- DropIndex
DROP INDEX "_TransactionCategories_B_index";

-- DropIndex
DROP INDEX "_TransactionCategories_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AutomationRuleCategories";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TransactionCategories";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT
);

-- CreateTable
CREATE TABLE "_TransactionTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Transaction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identifier" REAL,
    "issuedate" DATETIME,
    "issuer" TEXT,
    "type" TEXT,
    "purpose" TEXT,
    "balance" REAL,
    "balanceCurrency" TEXT,
    "amount" REAL,
    "amountCurrency" TEXT,
    "categoryId" INTEGER,
    CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "amountCurrency", "balance", "balanceCurrency", "createdAt", "id", "identifier", "issuedate", "issuer", "purpose", "type", "updatedAt") SELECT "amount", "amountCurrency", "balance", "balanceCurrency", "createdAt", "id", "identifier", "issuedate", "issuer", "purpose", "type", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_identifier_key" ON "Transaction"("identifier");
CREATE TABLE "new_AutomationRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "field" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "stringValue" TEXT,
    "numberValue" REAL,
    "dateValue" DATETIME,
    "activeOnUpload" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "AutomationRule_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AutomationRule" ("activeOnUpload", "createdAt", "dateValue", "field", "id", "numberValue", "operation", "stringValue", "updatedAt") SELECT "activeOnUpload", "createdAt", "dateValue", "field", "id", "numberValue", "operation", "stringValue", "updatedAt" FROM "AutomationRule";
DROP TABLE "AutomationRule";
ALTER TABLE "new_AutomationRule" RENAME TO "AutomationRule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_TransactionTags_AB_unique" ON "_TransactionTags"("A", "B");

-- CreateIndex
CREATE INDEX "_TransactionTags_B_index" ON "_TransactionTags"("B");
