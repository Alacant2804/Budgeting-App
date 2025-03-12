import React from "react";
import SliderHeader from "./SliderHeader";
import StatsHeader from "./StatsHeader";
import styles from "./MainHeader.module.css";

export default function MainHeader() {
  return (
    <>
      <header className={styles.header}>
        <SliderHeader />
        <StatsHeader />
      </header>
    </>
  );
}
