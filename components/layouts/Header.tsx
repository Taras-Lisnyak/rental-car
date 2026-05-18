"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isCatalogActive = pathname === "/catalog";

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.logo}>
          <svg width="102" height="16">
            <use xlinkHref="/sprite.svg#icon-RentalCar" />
          </svg>
        </div>
        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.link} ${isHomeActive ? styles.active : ""}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${styles.link} ${isCatalogActive ? styles.active : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}