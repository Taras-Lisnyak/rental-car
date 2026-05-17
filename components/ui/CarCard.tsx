import Link from "next/link";
import Image from "next/image";
import styles from "./CarCard.module.css";
import { Car } from "@/types";

export default function CarCard({ car }: { car: Car }) {
  if (!car) return null;

  return (
    <div className={styles.card}>
      {car.img && (
        <Image
  src={car.img}
  alt={`${car.brand} ${car.model}`}
  width={200}   
  height={120}  
  className={styles.image}
/>

      )}
      <h3 className={styles.title}>
        {car.brand} {car.model}
      </h3>
      <p className={styles.text}>Price: ${car.rentalPrice}</p>
      <p className={styles.text}>Mileage: {car.mileage} km</p>
      <Link href={`/catalog/${car.id}`} target="_blank" className={styles.link}>
        Read more
      </Link>
    </div>
  );
}

