/*
  Warnings:

  - You are about to drop the column `description` on the `Income` table. All the data in the column will be lost.
  - Added the required column `date` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "description";
