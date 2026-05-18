import axios from "axios";
import { Car } from "@/types";

export const fetchCars = async (
  page: number,
  filters?: { brand?: string; price?: number; minMileage?: number; maxMileage?: number }
): Promise<{ cars: Car[]; totalCars: number; page: number; totalPages: number }> => {
  const params: Record<string, string | number> = { page, perPage: 12 };

  if (filters?.brand) params.brand = filters.brand;
  if (filters?.price) params.price = filters.price;
  if (filters?.minMileage) params.minMileage = filters.minMileage;
  if (filters?.maxMileage) params.maxMileage = filters.maxMileage;

  const { data } = await axios.get("https://car-rental-api.goit.study/cars", { params });
  return data; 
};



export const fetchCarDetails = async (carId: string): Promise<Car> => {
  const { data } = await axios.get(`https://car-rental-api.goit.study/cars/${carId}`);
  return data;
};

interface RentalFormData {
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  comment?: string;
}

export const rentCar = async (
  carId: string,
  formData: { name: string; email: string; comment?: string }
) => {
  const { data } = await axios.post(
    `https://car-rental-api.goit.study/cars/${carId}/booking-requests`,
    {
      name: formData.name,
      email: formData.email,
      comment: formData.comment,
    }
  );
  return data; 
};
