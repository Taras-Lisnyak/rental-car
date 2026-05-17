import Link from "next/link";
import Image from "next/image";
import styles from "./CarCard.module.css";
import { Car } from "@/types";

export default function CarCard({ car }: { car: Car }) {
  if (!car) return null;

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {car.img && (
          <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={200}   
          height={120}  
          className={styles.image}
        />
        )}
        <div className={styles.cardInfo}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}</span>, {car.year}
          </h3>
          <p className={styles.price}>${car.rentalPrice}</p>
          <div className={styles.locationDetails}>
            <p className={styles.location}>
              {car.location.city}, {car.location.country} | {car.rentalCompany}
            </p>
            <p className={styles.details}>
              {car.type} | {car.mileage} km
            </p>
          </div>
        </div>
      </div>
      <Link href={`/catalog/${car.id}`} target="_blank" className={styles.buttonLink}>
        Read more
      </Link>
    </div>
  );
}

