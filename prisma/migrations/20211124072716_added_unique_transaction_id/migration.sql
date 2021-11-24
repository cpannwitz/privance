/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN "identifier" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_identifier_key" ON "Transaction"("identifier");
