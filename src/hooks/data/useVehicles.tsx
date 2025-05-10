import { useInfiniteQuery } from "@tanstack/react-query";
import { getVehicles } from "@/services/vehicle";

interface IUseVehiclesParams {
  filter: string;
  type: "tracked" | "others";
}

export function useVehicles({ filter, type }: IUseVehiclesParams) {
  return useInfiniteQuery({
    queryKey: ["vehicles", type, filter],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getVehicles({ page: pageParam, type, filter }),
    getNextPageParam: (response) =>
      response.page < response.totalPages ? response.page + 1 : undefined,
  });
}
