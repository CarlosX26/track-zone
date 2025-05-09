"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useVehicles } from "@/hooks/data/useVehicles";
import InfiniteScrollContainer from "../infiniteScrollContainer/InfiniteScrollContainer";

export function VehicleTable() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useVehicles();

  const vehicles = data?.pages.flatMap((page) => page.vehicles) || [];

  if (isPending) {
    return (
      <div className="mt-32">
        <Loader2 className="animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <>
      <InfiniteScrollContainer
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        className="space-y-2"
      >
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm overflow-x-auto mt-4 mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Frota</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles?.map((vehicle, index) => (
                <TableRow key={index}>
                  <TableCell>{vehicle.plate}</TableCell>
                  <TableCell>{vehicle.fleet}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </div>
      </InfiniteScrollContainer>

      {!isError && !vehicles.length && (
        <div className="text-center">Nenhum veículo encontrado.</div>
      )}

      {isError && (
        <div className="text-center text-red-500">Erro ao carregar veículos: {error.message}</div>
      )}
    </>
  );
}
