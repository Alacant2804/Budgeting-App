/*
  Warnings:

  - The `category` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'CASH';

-- DropEnum
DROP TYPE "AccountCategory";
