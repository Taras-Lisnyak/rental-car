"use client";

import { useState } from "react";
import styles from "./FilterForm.module.css";

interface Props {
  onFilter: (filters: { brand?: string; price?: number; mileageFrom?: number; mileageTo?: number }) => void;
}

export default function FilterForm({ onFilter }: Props) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [mileageFrom, setMileageFrom] = useState<number | undefined>();
  const [mileageTo, setMileageTo] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ brand, price, mileageFrom, mileageTo });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} className={styles.input} />
      <input type="number" placeholder="Max Price" value={price ?? ""} onChange={(e) => setPrice(Number(e.target.value))} className={styles.input} />
      <input type="number" placeholder="Mileage From" value={mileageFrom ?? ""} onChange={(e) => setMileageFrom(Number(e.target.value))} className={styles.input} />
      <input type="number" placeholder="Mileage To" value={mileageTo ?? ""} onChange={(e) => setMileageTo(Number(e.target.value))} className={styles.input} />
      <button type="submit" className={styles.button}>Apply Filters</button>
    </form>
  );
}
