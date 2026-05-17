"use client";

import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.logo}>
          <svg width="102" height="16">
            <use xlinkHref="/sprite.svg#icon-RentalCar" />
          </svg>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/catalog" className={styles.link}>Catalog</Link>
        </nav>
      </div>
    </header>
  );
}
