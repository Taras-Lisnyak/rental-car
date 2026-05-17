"use client";

import { useState } from "react";
import { useCars } from "@/hooks/useCars";
import CarCard from "@/components/ui/CarCard";
import styles from "./Catalog.module.css";

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    brand: "",
    price: "",
    minMileage: "",
    maxMileage: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const { data, fetchNextPage, isFetchingNextPage, refetch } = useCars(appliedFilters);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    const cleared = { brand: "", price: "", minMileage: "", maxMileage: "" };
    setFilters(cleared);
    setAppliedFilters(cleared);
    refetch(); 
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedFilters(filters); 
    refetch();
  };

  const [price, setPrice] = useState("");
  
  const [openSelect, setOpenSelect] = useState<{brand: boolean; price: boolean}>({
  brand: false,
  price: false,
});

return (
  <main className={styles.mainSection}>
    <div className="container">
      <div className={styles.filtersWrapper}>
       <form onSubmit={handleSearch} className={styles.filtersForm}>
        <div className={styles.filters}>
         <div className={styles.filterGroupOne}>
              <label className={styles.label}>Car brand</label>
              <div className={`${styles.selectWrapper} ${openSelect.brand ? styles.open : ""}`}>
        <select
          name="brand"
          value={filters.brand}
                  onChange={handleFilterChange}
                  onFocus={() => setOpenSelect({ ...openSelect, brand: true })}
      onBlur={() => setOpenSelect({ ...openSelect, brand: false })}
          className={styles.select}
        >
          <option value="">Choose brand</option>
          <option value="Buick">Buick</option>
          <option value="Volvo">Volvo</option>
          <option value="Subaru">Subaru</option>
          <option value="Chevrolet">Chevrolet</option>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Cadillac">Cadillac</option>
          <option value="Chrysler">Chrysler</option>
          <option value="Dodge">Dodge</option>
          <option value="Ford">Ford</option>
          <option value="Honda">Honda</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Infiniti">Infiniti</option>
          <option value="Jeep">Jeep</option>
          <option value="Kia">Kia</option>
          <option value="Mazda">Mazda</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Nissan">Nissan</option>
          <option value="Toyota">Toyota</option>
          <option value="Volkswagen">Volkswagen</option>
                </select>
                <svg className={styles.icon}>
    <use xlinkHref={openSelect.brand ? "/sprite.svg#icon-Vector" : "/sprite.svg#icon-Vector-1"}></use>
  </svg>
              </div>
      </div>

      <div className={styles.filterGroupTwo}>
              <label className={styles.label}>Price / 1 hour</label>
              <div className={`${styles.selectWrapper} ${openSelect.price ? styles.open : ""}`}>
         <select
      name="price"
      value={filters.price}
                  onChange={handleFilterChange}
                  onFocus={() => setOpenSelect({ ...openSelect, price: true })}
      onBlur={() => setOpenSelect({ ...openSelect, price: false })}
      className={`${styles.select} ${filters.price ? styles.hasValue : ""}`}
    >
          <option value="">Choose price</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
          <option value="100">100</option>
          <option value="110">110</option>
          <option value="120">120</option>
          <option value="130">130</option>
          <option value="140">140</option>
          <option value="150">150</option>
          <option value="160">160</option>
          <option value="170">170</option>
          <option value="180">180</option>
          <option value="190">190</option>
          <option value="200">200</option>
                </select>
                {filters.price && (
      <span className={styles.selectOverlay}>To ${filters.price}</span>
                )}
                
                <svg className={styles.icon}>
    <use xlinkHref={openSelect.brand ? "/sprite.svg#icon-Vector" : "/sprite.svg#icon-Vector-1"}></use>
  </svg>
  </div>
      </div>

      <div className={styles.filterGroupThree}>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.mileageGroup}>
          <input
            type="number"
            name="minMileage"
            value={filters.minMileage}
            onChange={handleFilterChange}
            placeholder="From"
            className={styles.input}
          />
          <input
            type="number"
            name="maxMileage"
            value={filters.maxMileage}
            onChange={handleFilterChange}
            placeholder="To"
            className={styles.input}
          />
        </div>
            </div>
            
      <div className={styles.filterGroupFour}>
              <div className={styles.buttonsGroup}>
                <button type="submit" className={styles.button}>Search</button>
                <span onClick={handleClear} className={styles.clear}>
                      Clear filters
              </span>
              
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className={styles.gridWrapper}>
    {data?.cars
      .reduce((acc: any[][], car: any, index: number) => {
        const chunkIndex = Math.floor(index / 4);
        if (!acc[chunkIndex]) acc[chunkIndex] = [];
        acc[chunkIndex].push(car);
        return acc;
      }, [])
      .map((chunk, i) => (
        <div key={i} className={styles.grid}>
          {chunk.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ))}
  </div>

        {data?.hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.loadMore}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
  </main>
);
}