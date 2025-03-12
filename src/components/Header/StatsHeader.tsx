"use client";

import Link from "next/link";
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
          <Link
            href="#net-worth"
            aria-label={`Net Worth, $${netWorth}`}
            role="listitem"
          >
            Net Worth
          </Link>
          <span>${netWorth}</span>
        </li>
        <li className={styles.financialItem}>
          <Link
            href="#expenses"
            aria-label={`Expenses amount, $${expenses}`}
            role="listitem"
          >
            Expenses
          </Link>
          <span>${expenses}</span>
        </li>
        <li className={styles.financialItem}>
          <Link
            href="#planned-expenses"
            aria-label={`Planned Expenses amount, $${plannedExpenses}`}
            role="listitem"
          >
            Planned
          </Link>
          <span>${plannedExpenses}</span>
        </li>
        <li className={styles.financialItem}>
          <Link
            href="#income"
            aria-label={`Income amount, $${income}`}
            role="listitem"
          >
            Income
          </Link>
          <span>${income}</span>
        </li>
      </ul>
    </nav>
  );
}
