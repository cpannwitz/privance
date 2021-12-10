-- CreateTable
CREATE TABLE "AutomationRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "field" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "stringValue" TEXT,
    "numberValue" REAL,
    "dateValue" DATETIME
);

-- CreateTable
CREATE TABLE "_AutomationRuleCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "AutomationRule" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AutomationRuleCategories_AB_unique" ON "_AutomationRuleCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_AutomationRuleCategories_B_index" ON "_AutomationRuleCategories"("B");
