"use client";

import { useState } from "react";
import styles from "./SliderHeader.module.css";

export default function SliderHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function isMenuOpen() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <>
      <button
        className={styles.hamburger}
        aria-label="Toggle menu"
        aria-controls="user-navigation"
        aria-expanded={isOpen}
        onClick={isMenuOpen}
      >
        ☰
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      )}

      <nav
        aria-label="User navigation"
        className={`${styles.userContainer} ${isOpen ? styles.open : ""}`}
      >
        <ul className={styles.menu}>
          <li className={`${styles.menuItem} ${styles.profile}`}>
            <a href="#profile">Profile</a>
          </li>
          <li className={`${styles.menuItem} ${styles.settings}`}>
            <a href="#settings">Settings</a>
          </li>
          <li className={`${styles.menuItem} ${styles.help}`}>
            <a href="#help">Help</a>
          </li>
          <li className={`${styles.menuItem} ${styles.login}`}>
            <a href="#login">Log In</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
