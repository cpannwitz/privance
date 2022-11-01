/*
  Warnings:

  - You are about to drop the column `dateValue` on the `AutomationRule` table. All the data in the column will be lost.
  - You are about to drop the column `field` on the `AutomationRule` table. All the data in the column will be lost.
  - You are about to drop the column `numberValue` on the `AutomationRule` table. All the data in the column will be lost.
  - You are about to drop the column `operation` on the `AutomationRule` table. All the data in the column will be lost.
  - You are about to drop the column `stringValue` on the `AutomationRule` table. All the data in the column will be lost.
  - Added the required column `value` to the `AutomationRule` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AutomationRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" TEXT NOT NULL,
    "activeOnUpload" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "AutomationRule_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AutomationRule" ("activeOnUpload", "categoryId", "createdAt", "id", "updatedAt") SELECT "activeOnUpload", "categoryId", "createdAt", "id", "updatedAt" FROM "AutomationRule";
DROP TABLE "AutomationRule";
ALTER TABLE "new_AutomationRule" RENAME TO "AutomationRule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
