-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "fromType" TEXT NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toType" TEXT NOT NULL,
    "toId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "icon" TEXT,
    "plannedExpenseId" INTEGER,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannedExpense" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PlannedExpense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Expense_plannedExpenseId_key" ON "Expense"("plannedExpenseId");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_plannedExpenseId_fkey" FOREIGN KEY ("plannedExpenseId") REFERENCES "PlannedExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
