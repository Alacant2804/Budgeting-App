/*
  Warnings:

  - The values [CHECKING,SAVINGS,VEHICLE,LOAN] on the enum `AccountCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountCategory_new" AS ENUM ('CASH', 'CREDIT', 'REAL_ESTATE', 'INVESTMENT', 'CUSTOM');
ALTER TABLE "Account" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Account" ALTER COLUMN "category" TYPE "AccountCategory_new" USING ("category"::text::"AccountCategory_new");
ALTER TYPE "AccountCategory" RENAME TO "AccountCategory_old";
ALTER TYPE "AccountCategory_new" RENAME TO "AccountCategory";
DROP TYPE "AccountCategory_old";
ALTER TABLE "Account" ALTER COLUMN "category" SET DEFAULT 'CUSTOM';
COMMIT;
