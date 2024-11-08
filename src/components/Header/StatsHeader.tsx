"use client";

import { useFinancialContext } from "@/context/FinancialContext";

import styles from "./StatsHeader.module.css";

export default function StatsHeader() {
  const { netWorth, expenses, plannedExpenses, income } = useFinancialContext();

  return (
    <nav
      aria-label="Financial information"
      className={styles.financialContainer}
    >
      <ul className={styles.financialInformation} role="list">
        <li className={styles.financialItem}>
          <a
            href="#net-worth"
            aria-label={`Net Worth, $${netWorth}`}
            role="listitem"
          >
            Net Worth
          </a>
          <span>${netWorth}</span>
        </li>
        <li className={styles.financialItem}>
          <a
            href="#expenses"
            aria-label={`Expenses amount, $${expenses}`}
            role="listitem"
          >
            Expenses
          </a>
          <span>${expenses}</span>
        </li>
        <li className={styles.financialItem}>
          <a
            href="#planned-expenses"
            aria-label={`Planned Expenses amount, $${plannedExpenses}`}
            role="listitem"
          >
            Planned
          </a>
          <span>${plannedExpenses}</span>
        </li>
        <li className={styles.financialItem}>
          <a
            href="#income"
            aria-label={`Income amount, $${income}`}
            role="listitem"
          >
            Income
          </a>
          <span>${income}</span>
        </li>
      </ul>
    </nav>
  );
}
