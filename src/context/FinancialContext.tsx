'use client';

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

const FinancialContext = createContext<FinancialContextProps | undefined>(undefined);

export const FinancialProvider = ({ children }: {children: ReactNode}) => {
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [plannedExpenses, setPlannedExpenses] = useState(0);

    const netWorth = income - expenses - plannedExpenses;

    const updateIncome = (amount: number) => setIncome((prev) => prev + amount);
    const updateExpenses = (amount: number) => setExpenses((prev) => prev + amount);
    const updatePlannedExpenses = (amount: number) => setPlannedExpenses((prev) => prev + amount);

    return (
        <FinancialContext.Provider
            value={{
                netWorth,
                income,
                expenses,
                plannedExpenses,
                updateIncome,
                updateExpenses,
                updatePlannedExpenses,
            }}
        >
            {children}
        </FinancialContext.Provider>
    );
}

export function useFinancialContext() {
    const context = useContext(FinancialContext);
    if (!context) {
        throw new Error("useFinancialContext must be used within a FinancialProvider");
    }
    return context;
}

export default FinancialContext;