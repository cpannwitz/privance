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
    "amount" REAL,
    "currency" TEXT
);
INSERT INTO "new_Transaction" ("amount", "balance", "createdAt", "currency", "id", "identifier", "issuedate", "issuer", "purpose", "type", "updatedAt") SELECT "amount", "balance", "createdAt", "currency", "id", "identifier", "issuedate", "issuer", "purpose", "type", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE UNIQUE INDEX "Transaction_identifier_key" ON "Transaction"("identifier");
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT
);
INSERT INTO "new_Category" ("color", "icon", "id", "name") SELECT "color", "icon", "id", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_AutomationRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "field" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "stringValue" TEXT,
    "numberValue" REAL,
    "dateValue" DATETIME
);
INSERT INTO "new_AutomationRule" ("dateValue", "field", "id", "numberValue", "operation", "stringValue") SELECT "dateValue", "field", "id", "numberValue", "operation", "stringValue" FROM "AutomationRule";
DROP TABLE "AutomationRule";
ALTER TABLE "new_AutomationRule" RENAME TO "AutomationRule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
