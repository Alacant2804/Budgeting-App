"use client";

import { useHeader } from "../Header/Header";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isOpen } = useHeader();

  return (
    <div className={styles.layout}>
      <main className={`${styles.main} ${isOpen ? styles.mainShifted : ""}`}>
        {children}
      </main>
    </div>
  );
}
