import Image from "next/image";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.pageContainer}>
      <h1 className={styles.title}>Welcome to RentalCar</h1>
      <p className={styles.subtitle}>Find your perfect car for rent today.</p>
      <a href="/catalog" className={styles.button}>
        View Catalog
      </a>
    </main>
  );
}