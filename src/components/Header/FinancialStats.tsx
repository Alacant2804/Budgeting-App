'use client'

import React from "react";
import { useFinancialContext } from "@/context/FinancialContext";

export default function FinancialStats() {
    const { netWorth, expenses, plannedExpenses, income } = useFinancialContext();
    
    return (
        <ul className="financial-information" role="list">
            <li>
                <a href="#net-worth" aria-label={`Net Worth, $${netWorth}`} role="listitem">Net Worth</a>
                <span>${netWorth}</span>
            </li>
            <li>
                <a href="#expenses" aria-label={`Expenses amount, $${expenses}`} role="listitem">Expenses</a>
                <span>${expenses}</span>
            </li>
            <li>
                <a href="#planned-expenses" aria-label={`Planned Expenses amount, $${plannedExpenses}`} role="listitem">Planned</a>
                <span>${plannedExpenses}</span>
            </li>
            <li>
                <a href="#income" aria-label={`Income amount, $${income}`} role="listitem">Income</a>
                <span>${income}</span>
            </li>
        </ul>
    )
}