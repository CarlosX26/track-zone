"use client";
import { useFilter } from "@/contexts/filter";
import { useVehicles } from "@/hooks/data/useVehicles";
import { Map, useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { VehicleMarker } from "../vehicleMarker";

export const VehicleMap = () => {
  const { filter } = useFilter();
  const { data } = useVehicles({
    filter: filter.search,
    type: filter.type,
  });

  const vehiclesTracked = data?.pages.flatMap((page) => page.locationVehicles ?? []) ?? [];

  const map = useMap();

  useEffect(() => {
    if (!map || vehiclesTracked.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    vehiclesTracked.forEach((vehicle) => {
      bounds.extend({ lat: vehicle.lat, lng: vehicle.lng });
    });

    map.fitBounds(bounds);
  }, [map, vehiclesTracked]);

  return (
    <div className="w-full h-full">
      <h3 className="my-4 font-semibold">Mapa rastreador</h3>
      <div className="rounded-2xl overflow-hidden shadow-lg border border-muted h-96">
        <Map
          mapId={"bf51a910020fa25a"}
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: -14.235, lng: -51.9253 }} // Centro aproximado do Brasil
          defaultZoom={4}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {vehiclesTracked.map((vehicle, index) => (
            <VehicleMarker vehicle={vehicle} key={index} />
          ))}
        </Map>
      </div>
    </div>
  );
};
