import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.pageContainer}>
      <section className={styles.hero}>
        <Image
          src="/hero-car.webp"
          alt="Rental car driving on highway"
          fill
          priority
          className={styles.heroImage}
          sizes="1440px"
        />

         <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>Find your perfect rental car</h1>
            <p className={styles.subtitle}>Reliable and budget-friendly rentals for any journey</p>
          </div>
          <Link href="/catalog" className={styles.button}>
            View Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}