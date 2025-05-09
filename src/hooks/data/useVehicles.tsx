import { useInfiniteQuery } from "@tanstack/react-query";
import { getVehicles } from "@/services/vehicle";

export function useVehicles() {
  return useInfiniteQuery({
    queryKey: ["vehicles"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getVehicles({ page: pageParam, type: "tracked" }),
    getNextPageParam: (response) =>
      response.page < response.totalPages ? response.page + 1 : undefined,
  });
}
