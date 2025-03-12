"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./SliderHeader.module.css";

export default function SliderHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.hamburger}
        aria-label="Toggle menu"
        aria-controls="user-navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ☰
      </button>

      {isOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          ></div>
          <nav
            aria-label="User navigation"
            className={`${styles.userContainer} ${isOpen ? styles.open : ""}`}
          >
            <ul className={styles.menu}>
              <li className={`${styles.menuItem} ${styles.profile}`}>
                <Link href="#profile">Profile</Link>
              </li>
              <li className={`${styles.menuItem} ${styles.settings}`}>
                <Link href="#settings">Settings</Link>
              </li>
              <li className={`${styles.menuItem} ${styles.help}`}>
                <Link href="#help">Help</Link>
              </li>
              <li className={`${styles.menuItem} ${styles.login}`}>
                <Link href="#login">Log In</Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
