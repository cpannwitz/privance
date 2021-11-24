/*
  Warnings:

  - You are about to alter the column `identifier` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "identifier" REAL,
    "issuedate" DATETIME,
    "issuer" TEXT,
    "type" TEXT,
    "purpose" TEXT,
    "balance" REAL,
    "amount" REAL,
    "currency" TEXT
);
INSERT INTO "new_Transaction" ("amount", "balance", "createdAt", "currency", "id", "identifier", "issuedate", "issuer", "purpose", "type", "updatedAt") SELECT "amount", "balance", "createdAt", "currency", "id", "identifier", "issuedate", "issuer", "purpose", "type", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_identifier_key" ON "Transaction"("identifier");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
