import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api";
import { Car } from "@/types";

type Filters = {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
};

type CarsPage = { cars: Car[]; totalCars: number; page: number; totalPages: number };
type SelectedData = { cars: Car[]; hasNextPage: boolean };

export const useCars = (filters?: Filters) => {
  return useInfiniteQuery<CarsPage, unknown, SelectedData>({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam }) => fetchCars(pageParam as number, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage: CarsPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,

    // 🔹 формуємо зручну структуру
    select: (data) => ({
      cars: data.pages.flatMap((page) => page.cars),
      hasNextPage:
        data.pages[data.pages.length - 1].page <
        data.pages[data.pages.length - 1].totalPages,
    }),
  });
};

// export const useCars = (
//   filters?: { brand?: string; price?: number; minMileage?: number; maxMileage?: number }
// ) => {
//   return useInfiniteQuery({
//     queryKey: ["cars", filters],
//     queryFn: ({ pageParam = 1 }) => fetchCars(pageParam, filters),
//     getNextPageParam: (lastPage) => {
//       if (lastPage.page < lastPage.totalPages) {
//         return lastPage.page + 1;
//       }
//       return undefined;
//     },
//     select: (data) => ({
//       cars: data.pages.flatMap((page) => page.cars),
//       hasNextPage: data.pages[data.pages.length - 1].page < data.pages[data.pages.length - 1].totalPages,
//     }),
//   });
// };
