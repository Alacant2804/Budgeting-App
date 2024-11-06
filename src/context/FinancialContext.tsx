import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FinancialContextProps {
    netWorth: number;
    income: number;
    expenses: number;
    plannedExpenses: number;
    updateIncome: (amount: number) => void;
    updateExpenses: (amount: number) => void;
    updatePlannedExpenses: (amount: number) => void; 
}

const FinancialContext = createContext(null);

export default FinancialContext;