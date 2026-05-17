import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/api";
import { Car } from "@/types";

export const useCars = (
  filters?: { brand?: string; price?: number; minMileage?: number; maxMileage?: number }
) => {
  return useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam = 1 }) => fetchCars(pageParam, filters),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    select: (data) => ({
      cars: data.pages.flatMap((page) => page.cars),
      hasNextPage: data.pages[data.pages.length - 1].page < data.pages[data.pages.length - 1].totalPages,
    }),
  });
};
