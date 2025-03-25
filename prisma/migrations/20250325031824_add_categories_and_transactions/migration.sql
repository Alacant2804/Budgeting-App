/*
  Warnings:

  - Added the required column `category` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountCategory" AS ENUM ('CHECKING', 'SAVINGS', 'CREDIT', 'REAL_ESTATE', 'VEHICLE', 'LOAN', 'INVESTMENT', 'CUSTOM');

-- CreateEnum
CREATE TYPE "IncomeCategory" AS ENUM ('SALARY', 'BUSINESS', 'INVESTMENT', 'RENTAL', 'CASHBACK', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('HOUSING', 'UTILITIES', 'TRANSPORTATION', 'GROCERIES', 'EATING_OUT', 'SPORT', 'EDUCATION', 'GIFTS', 'PERSONAL_CARE', 'INSURANCE', 'HEALTHCARE', 'ENTERTAINMENT', 'SHOPPING', 'CLOTHES', 'TRAVEL', 'CHARITY', 'TAXES', 'CUSTOM');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "category" "AccountCategory" NOT NULL DEFAULT 'CUSTOM';

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "category" "ExpenseCategory" NOT NULL DEFAULT 'CUSTOM',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "category" "IncomeCategory" NOT NULL DEFAULT 'CUSTOM';

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "category" TEXT NOT NULL;
