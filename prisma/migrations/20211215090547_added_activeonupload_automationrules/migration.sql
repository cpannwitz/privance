-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AutomationRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "field" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "stringValue" TEXT,
    "numberValue" REAL,
    "dateValue" DATETIME,
    "activeOnUpload" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_AutomationRule" ("createdAt", "dateValue", "field", "id", "numberValue", "operation", "stringValue", "updatedAt") SELECT "createdAt", "dateValue", "field", "id", "numberValue", "operation", "stringValue", "updatedAt" FROM "AutomationRule";
DROP TABLE "AutomationRule";
ALTER TABLE "new_AutomationRule" RENAME TO "AutomationRule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
