"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import {
  FaHome,
  FaWallet,
  FaExchangeAlt,
  FaChartPie,
  FaFileAlt,
  FaBullseye,
  FaChartLine,
} from "react-icons/fa";

interface HeaderContextType {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(
  undefined
);

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}

interface MainHeaderProps {
  children: ReactNode;
}

export default function MainHeader({ children }: MainHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <HeaderContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
      <header role="banner" aria-label="Main navigation">
        <button
          className={styles.hamburger}
          aria-label="Toggle navigation menu"
          aria-controls="user-navigation"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          aria-haspopup="true"
        >
          ☰
        </button>

        <nav
          id="user-navigation"
          role="navigation"
          aria-label="User navigation menu"
          className={`${styles.userContainer} ${isOpen ? styles.open : ""}`}
        >
          <ul className={styles.menu} role="menu">
            <li className={`${styles.menuItem} ${styles.profile}`} role="none">
              <Link href="/" onClick={closeMenu} role="menuitem">
                <FaHome className={styles.icon} />
                <span className={styles.linkText}>Dashboard</span>
              </Link>
            </li>
            <li className={`${styles.menuItem} ${styles.settings}`} role="none">
              <Link href="/accounts" onClick={closeMenu} role="menuitem">
                <FaWallet className={styles.icon} />
                <span className={styles.linkText}>Accounts</span>
              </Link>
            </li>
            <li className={`${styles.menuItem} ${styles.help}`} role="none">
              <Link href="/transactions" onClick={closeMenu} role="menuitem">
                <FaExchangeAlt className={styles.icon} />
                <span className={styles.linkText}>Transactions</span>
              </Link>
            </li>
            <li className={`${styles.menuItem} ${styles.budget}`} role="none">
              <Link href="/budget" onClick={closeMenu} role="menuitem">
                <FaChartPie className={styles.icon} />
                <span className={styles.linkText}>Budget</span>
              </Link>
            </li>
            <li className={`${styles.menuItem} ${styles.login}`} role="none">
              <Link href="/reports" onClick={closeMenu} role="menuitem">
                <FaFileAlt className={styles.icon} />
                <span className={styles.linkText}>Reports</span>
              </Link>
            </li>
            <li className={`${styles.menuItem} ${styles.goals}`} role="none">
              <Link href="/goals" onClick={closeMenu} role="menuitem">
                <FaBullseye className={styles.icon} />
                <span className={styles.linkText}>Goals</span>
              </Link>
            </li>
            <li
              className={`${styles.menuItem} ${styles.investments}`}
              role="none"
            >
              <Link href="/investments" onClick={closeMenu} role="menuitem">
                <FaChartLine className={styles.icon} />
                <span className={styles.linkText}>Investments</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </HeaderContext.Provider>
  );
}
