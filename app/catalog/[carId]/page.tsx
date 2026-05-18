"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchCarDetails, rentCar } from "@/lib/api";
import { useState } from "react";
import Image from "next/image";
import styles from "./CarDetails.module.css";
import toast from "react-hot-toast";
import { Car } from "@/types";

import {
  FaCalendarAlt,
  FaCarSide,
  FaGasPump,
  FaCogs,
  FaRoad,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function CarDetailsPage() {
  const { carId } = useParams();
  const { data: car, isLoading } = useQuery<Car>({
    queryKey: ["car", carId],
    queryFn: () => fetchCarDetails(carId as string),
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!car) return;

  try {
    const response = await rentCar(car.id, {
      name: formData.name,
      email: formData.email,
      comment: formData.comment,
    });

    console.log("Booking response:", response);


    toast.success(response.message);

    setFormData({
      name: "",
      email: "",
      comment: "",
      phone: "",
      startDate: "",
      endDate: "",
    });
  } catch (err: any) {
    console.error("Booking error:", err);
    if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("❌ Помилка при оформленні оренди. Спробуйте ще раз.");
    }
  }
};

  if (isLoading) return <p>Loading...</p>;
  if (!car) return <p>Car not found</p>;

return (
   <main className={styles.mainSectionDetails}>
  <div className={styles.container}>
    <div className={styles.carSection}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={800}
        height={500}
        className={styles.image}
      />
      <div className={styles.bookingContainer}>
        <div className={styles.bookingInfo}>
          <h3 className={styles.subtitle}>Book your car now</h3>
          <p className={styles.helperText}>
            Stay connected! We are always ready to help you.
          </p>
        </div>
        <div className={styles.bookingForm}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Name*"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={styles.input}
                required
              />
              <input
                type="email"
                placeholder="Email*"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={styles.input}
                required
              />
              <textarea
                placeholder="Comment"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.button}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
    <div className={styles.details}>
    <div className={styles.detailsHeader}>
      <h2 className={styles.title}>
        {car.brand} {car.model}, {car.year}
      </h2>
      <p className={styles.location}>
        <FaMapMarkerAlt color="#2563eb" /> {car.location.city}, {car.location.country}
      </p>
      <p className={styles.price}>💲 ${car.rentalPrice}</p>
      <p className={styles.description}>
        {car.description ||
          `${car.brand} ${car.model} — стильний і просторий автомобіль, який забезпечує комфортну поїздку та має розкішні характеристики.`}
      </p>
    </div>
    <div className={styles.detailsBody}>
      <h3 className={styles.subtitle}>Rental Conditions:</h3>
      <ul className={styles.list}>
        {car.rentalConditions.map((c, i) => (
          <li key={i}>
            <FaCheckCircle color="#2563eb" /> {c}
          </li>
        ))}
      </ul>
      <h3 className={styles.subtitle}>Car Specifications:</h3>
      <ul className={styles.list}>
        <li><FaCalendarAlt color="#2563eb" /> Year: {car.year}</li>
        <li><FaCarSide color="#2563eb" /> Type: {car.type}</li>
        <li><FaGasPump color="#2563eb" /> Fuel Consumption: {car.fuelConsumption} L/100km</li>
        <li><FaCogs color="#2563eb" /> Engine: {car.engine}</li>
        <li><FaRoad color="#2563eb" /> Mileage: {car.mileage} km</li>
      </ul>
      <h3 className={styles.subtitle}>Features:</h3>
      <ul className={styles.list}>
        {car.features.map((f, i) => (
          <li key={i}>
            <FaCheckCircle color="#2563eb" /> {f}
          </li>
        ))}
      </ul>
    </div>
    </div>
  </div>
</main>
  );
}