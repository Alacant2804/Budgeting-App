/*
  Warnings:

  - Made the column `updatedAt` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Income` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "updatedAt" SET NOT NULL;
